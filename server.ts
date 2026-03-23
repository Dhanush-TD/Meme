import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase Admin Setup (Optional - if service account exists)
// For this environment, we'll stick to the API simulation but prepare for Firestore
// In a real production app, we'd use firebase-admin to push updates to Firestore

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // AI Pipeline Simulation (Gemini)
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  // Dashboard Data State
  let dashboardData = {
    coins: [
      { coin: "DOGE", price: 0.1642, change_24h: 12.4, trend: "up", prediction: "BUY", confidence: 92, sentiment: "Bullish", meme_score: 9.8, dominance: 42.1 },
      { coin: "PEPE", price: 0.0000084, change_24h: 4.2, trend: "up", prediction: "HOLD", confidence: 64, sentiment: "Neutral", meme_score: 8.4, dominance: 15.2 },
      { coin: "SHIB", price: 0.0000271, change_24h: -2.1, trend: "down", prediction: "SELL", confidence: 78, sentiment: "Bearish", meme_score: 7.2, dominance: 22.5 },
      { coin: "FLOKI", price: 0.00019, change_24h: 0.0, trend: "neutral", prediction: "HOLD", confidence: 45, sentiment: "Neutral", meme_score: 6.5, dominance: 8.9 },
      { coin: "BONK", price: 0.000024, change_24h: 18.9, trend: "up", prediction: "BUY", confidence: 88, sentiment: "Strong Bull", meme_score: 9.1, dominance: 11.3 },
    ],
    sentiment_index: { label: "Extreme Greed", score: 84 },
    network_activity: { mentions: 142800, influencer_score: "High", velocity: 4.2 }
  };

  // Background Worker (Every 5 mins)
  setInterval(async () => {
    console.log("Updating intelligence nodes...");
    dashboardData.coins = dashboardData.coins.map(c => ({
      ...c,
      price: c.price * (1 + (Math.random() * 0.02 - 0.01)),
      change_24h: c.change_24h + (Math.random() * 2 - 1),
      confidence: Math.min(100, Math.max(0, c.confidence + (Math.random() * 4 - 2)))
    }));
    dashboardData.sentiment_index.score = Math.min(100, Math.max(0, dashboardData.sentiment_index.score + (Math.random() * 6 - 3)));
  }, 300000);

  // API Routes
  app.get("/api/dashboard", (req, res) => {
    res.json(dashboardData);
  });

  app.get("/api/coin/:coin", (req, res) => {
    const coin = dashboardData.coins.find(c => c.coin.toLowerCase() === req.params.coin.toLowerCase());
    if (coin) {
      res.json({
        ...coin,
        explanation: "Market momentum is driven by high social engagement and whale accumulation in the last 24 hours."
      });
    } else {
      res.status(404).json({ error: "Coin not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
