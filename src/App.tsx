import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Heatmap } from './components/Heatmap';
import { StatsPanel } from './components/StatsPanel';
import { IntelligenceNode } from './components/IntelligenceNode';
import { DashboardData, CoinData } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { db } from './firebase';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { SignalsPage } from './pages/SignalsPage';
import { HeatmapPage } from './pages/HeatmapPage';
import { InsightModal } from './components/InsightModal';
import { AlertModal } from './components/AlertModal';
import { ProfileModal } from './components/ProfileModal';

interface DashboardProps {
  data: DashboardData;
  onCoinClick: (coin: CoinData) => void;
  onNewAlert: () => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onCoinClick, onNewAlert, activeFilter, setActiveFilter }) => {
  const filteredCoins = data.coins.filter(coin => {
    if (activeFilter === 'Trending') return coin.change_24h > 5;
    if (activeFilter === 'High Confidence') return coin.confidence > 80;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 md:p-10 max-w-[1600px] mx-auto space-y-12"
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#5bff49]/10 border border-[#5bff49]/20 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5bff49] animate-pulse"></span>
            <span className="text-[10px] font-bold text-[#5bff49] tracking-widest uppercase">Live Signal Feed</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight max-w-2xl">
            Meme Coin <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#85adff] to-[#0070eb]">Intelligence</span> Dashboard
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-[#1c2024] text-slate-400 text-[10px] font-bold tracking-widest uppercase rounded-full hover:bg-[#282d31] transition-all active:scale-95">Export Report</button>
          <button 
            onClick={onNewAlert}
            className="px-6 py-3 bg-[#85adff] text-black text-[10px] font-bold tracking-widest uppercase rounded-full hover:bg-[#6c9fff] transition-all active:scale-95 shadow-[0_0_20px_rgba(133,173,255,0.3)]"
          >
            New Alert
          </button>
        </div>
      </motion.section>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9">
          <Heatmap coins={data.coins} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          <StatsPanel sentiment={data.sentiment_index} activity={data.network_activity} />
        </div>
      </div>

      {/* Active Nodes Section */}
      <section>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h3 className="text-xl font-black tracking-tight">Active Intelligence Nodes</h3>
          <div className="flex flex-wrap gap-4 md:gap-6 text-[10px] font-bold tracking-widest uppercase text-slate-500">
            {['All Assets', 'High Confidence', 'Trending'].map(filter => (
              <span 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`cursor-pointer transition-colors ${activeFilter === filter ? 'text-[#85adff]' : 'hover:text-white'}`}
              >
                {filter}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredCoins.map((coin) => (
            <IntelligenceNode key={coin.coin} coin={coin} onClick={onCoinClick} />
          ))}
        </div>
      </section>

      {/* Upgrade Section */}
      <div className="min-h-[280px] rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-12 bg-[#101417] border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#85adff]/5 via-transparent to-[#5bff49]/5"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#85adff]/10 via-transparent to-transparent opacity-40"></div>
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Elite Intelligence Terminal</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Access localized sentiment data from over 1,200 specialized channels. Our neural network processes 40k+ memes per minute to define the 'Sovereign Edge'.
          </p>
          <button className="px-8 py-4 bg-[#85adff] text-black font-bold rounded-full text-xs tracking-widest uppercase hover:bg-[#6c9fff] transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(133,173,255,0.2)] hover:shadow-[0_0_30px_rgba(133,173,255,0.4)]">
            Upgrade to Sovereign Plus
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCoinForInsight, setSelectedCoinForInsight] = useState<CoinData | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Assets');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const toggleWishlist = (coinSymbol: string) => {
    setWishlist(prev => 
      prev.includes(coinSymbol) 
        ? prev.filter(s => s !== coinSymbol) 
        : [...prev, coinSymbol]
    );
    setNotification(wishlist.includes(coinSymbol) ? `Removed ${coinSymbol} from watchlist` : `Added ${coinSymbol} to watchlist`);
    setTimeout(() => setNotification(null), 3000);
  };

  const saveAlert = (alert: any) => {
    setAlerts(prev => [...prev, alert]);
    setNotification(`Alert set for ${alert.coin} ${alert.type}`);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    let coinsLoaded = false;
    let statsLoaded = false;

    const checkLoading = () => {
      if (coinsLoaded && statsLoaded) {
        setLoading(false);
      }
    };

    const mockCoins: CoinData[] = [
      { 
        coin: "DOGE", price: 0.1642, change_24h: 12.4, trend: "up", prediction: "BUY", confidence: 92, sentiment: "Bullish", meme_score: 9.8, dominance: 42.1,
        purchase_trend: "stable increase",
        detailed_insight: "Whale accumulation has reached a 6-month high. Social sentiment is decoupling from BTC, indicating independent meme-driven momentum.",
        factors: [
          { label: "Social Buzz", value: 95 },
          { label: "Whale Activity", value: 88 },
          { label: "Technical RSI", value: 64 }
        ]
      },
      { 
        coin: "PEPE", price: 0.0000084, change_24h: 4.2, trend: "up", prediction: "HOLD", confidence: 64, sentiment: "Neutral", meme_score: 8.4, dominance: 15.2,
        purchase_trend: "small increase",
        detailed_insight: "Consolidation phase detected. Retail interest remains high but large volume sell walls are present at $0.000009.",
        factors: [
          { label: "Social Buzz", value: 72 },
          { label: "Whale Activity", value: 45 },
          { label: "Liquidity", value: 82 }
        ]
      },
      { 
        coin: "SHIB", price: 0.0000271, change_24h: -2.1, trend: "down", prediction: "SELL", confidence: 78, sentiment: "Bearish", meme_score: 7.2, dominance: 22.5,
        purchase_trend: "decreasing",
        detailed_insight: "Network activity is slowing down. High exchange inflows suggest potential sell-off pressure from early holders.",
        factors: [
          { label: "Social Buzz", value: 42 },
          { label: "Whale Activity", value: 31 },
          { label: "Exchange Inflow", value: 91 }
        ]
      },
      { 
        coin: "FLOKI", price: 0.00019, change_24h: 0.0, trend: "neutral", prediction: "HOLD", confidence: 45, sentiment: "Neutral", meme_score: 6.5, dominance: 8.9,
        purchase_trend: "flat",
        detailed_insight: "Low volatility period. Awaiting breakout signal from ecosystem news. Monitoring developer wallet activity.",
        factors: [
          { label: "Social Buzz", value: 55 },
          { label: "Whale Activity", value: 48 },
          { label: "Dev Activity", value: 76 }
        ]
      },
      { 
        coin: "BONK", price: 0.000024, change_24h: 18.9, trend: "up", prediction: "BUY", confidence: 88, sentiment: "Strong Bull", meme_score: 9.1, dominance: 11.3,
        purchase_trend: "rapid increase",
        detailed_insight: "Solana ecosystem synergy is driving massive adoption. DApp integration count has doubled in the last 48 hours.",
        factors: [
          { label: "Social Buzz", value: 98 },
          { label: "Whale Activity", value: 72 },
          { label: "Ecosystem Growth", value: 94 }
        ]
      },
    ];

    const mockStats = {
      sentiment_index: { label: "Extreme Greed", score: 84 },
      network_activity: { mentions: 142800, influencer_score: "High", velocity: 4.2 }
    };

    // Real-time simulation for dummy data
    const simulationInterval = setInterval(() => {
      setData(prev => {
        if (!prev) return prev;
        const newScore = Math.min(100, Math.max(0, prev.sentiment_index.score + (Math.random() * 0.4 - 0.2)));
        return {
          ...prev,
          coins: prev.coins.map(c => ({
            ...c,
            price: c.price * (1 + (Math.random() * 0.002 - 0.001)),
            change_24h: c.change_24h + (Math.random() * 0.1 - 0.05),
          })),
          sentiment_index: {
            ...prev.sentiment_index,
            score: Number(newScore.toFixed(2))
          },
          network_activity: {
            ...prev.network_activity,
            mentions: prev.network_activity.mentions + Math.floor(Math.random() * 10 - 5)
          }
        };
      });
    }, 2000);

    // Real-time listener for coins collection
    const unsubscribeCoins = onSnapshot(collection(db, 'coins'), (snapshot) => {
      const coins = snapshot.docs.map(doc => doc.data() as CoinData);
      setData(prev => ({
        coins: coins.length > 0 ? coins : (prev?.coins || mockCoins),
        sentiment_index: prev?.sentiment_index || mockStats.sentiment_index,
        network_activity: prev?.network_activity || mockStats.network_activity
      }));
      coinsLoaded = true;
      checkLoading();
    }, (error) => {
      console.error("Coins listener error:", error);
      coinsLoaded = true;
      checkLoading();
    });

    // Real-time listener for global stats
    const unsubscribeStats = onSnapshot(doc(db, 'stats', 'global'), (statDoc) => {
      if (statDoc.exists()) {
        const stats = statDoc.data();
        setData(prev => ({
          coins: prev?.coins || mockCoins,
          sentiment_index: { label: stats.sentiment_label || "Extreme Greed", score: stats.sentiment_score || 84 },
          network_activity: { 
            mentions: stats.mentions_1h || 142800, 
            influencer_score: stats.influencer_buzz || "High", 
            velocity: stats.meme_velocity || 4.2 
          }
        }));
      } else {
        setData(prev => ({
          coins: prev?.coins || mockCoins,
          ...mockStats
        }));
      }
      statsLoaded = true;
      checkLoading();
    }, (error) => {
      console.error("Stats listener error:", error);
      statsLoaded = true;
      checkLoading();
    });

    return () => {
      clearInterval(simulationInterval);
      unsubscribeCoins();
      unsubscribeStats();
    };
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#0b0e11] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#85adff] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#85adff] font-bold tracking-widest text-xs uppercase">Initializing Intelligence Terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#0b0e11] text-white font-body selection:bg-[#85adff] selection:text-black flex overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          onProfileClick={() => setIsProfileModalOpen(true)}
        />
        
        <main className="flex-1 min-h-screen overflow-y-auto lg:pl-64 transition-all duration-300">
          <TopBar 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            onProfileClick={() => setIsProfileModalOpen(true)}
          />

          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20, x: '-50%' }}
                animate={{ opacity: 1, y: 20, x: '-50%' }}
                exit={{ opacity: 0, y: -20, x: '-50%' }}
                className="fixed top-0 left-1/2 z-[200] px-6 py-3 bg-[#85adff] text-black font-bold rounded-full text-xs tracking-widest uppercase shadow-2xl"
              >
                {notification}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <Dashboard 
                  data={data} 
                  onCoinClick={setSelectedCoinForInsight}
                  onNewAlert={() => setIsAlertModalOpen(true)}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              } />
              <Route path="/signals" element={<SignalsPage />} />
              <Route path="/heatmap" element={<HeatmapPage />} />
              <Route path="/portfolio" element={<div className="p-10 text-center text-slate-500 uppercase tracking-widest font-bold">Portfolio Module Coming Soon</div>} />
              <Route path="/watchlist" element={
                <div className="p-10 max-w-4xl mx-auto">
                  <h2 className="text-3xl font-black mb-8 tracking-tighter">Your Watchlist</h2>
                  {wishlist.length === 0 ? (
                    <div className="p-12 border border-dashed border-white/10 rounded-3xl text-center">
                      <p className="text-slate-500 uppercase tracking-widest font-bold text-sm">No assets in your watchlist yet</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {data.coins.filter(c => wishlist.includes(c.coin)).map(coin => (
                        <IntelligenceNode key={coin.coin} coin={coin} onClick={setSelectedCoinForInsight} />
                      ))}
                    </div>
                  )}
                </div>
              } />
              <Route path="/settings" element={<div className="p-10 text-center text-slate-500 uppercase tracking-widest font-bold">Settings Module Coming Soon</div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>

          <InsightModal 
            coin={selectedCoinForInsight} 
            onClose={() => setSelectedCoinForInsight(null)} 
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
          />
          
          <AlertModal 
            isOpen={isAlertModalOpen} 
            onClose={() => setIsAlertModalOpen(false)} 
            coins={data.coins}
            onSaveAlert={saveAlert}
          />

          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
          />

          {/* Footer */}
          <footer className="p-6 md:p-10 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-widest uppercase text-slate-500">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <span>API Status: <span className="text-emerald-400">Nominal</span></span>
              <span>Latency: 14ms</span>
              <span>Node: US-EAST-1</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            <div className="text-[#85adff]">© 2024 MemeIntel Sovereign Ledger</div>
          </footer>
        </main>
      </div>
    </Router>
  );
}

