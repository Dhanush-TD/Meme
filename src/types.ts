export interface CoinData {
  coin: string;
  price: number;
  change_24h: number;
  trend: 'up' | 'down' | 'neutral';
  prediction: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  sentiment: string;
  meme_score: number;
  dominance: number;
  explanation?: string;
  factors?: { label: string; value: number }[];
  purchase_trend?: string;
  detailed_insight?: string;
}

export interface DashboardData {
  coins: CoinData[];
  sentiment_index: {
    label: string;
    score: number;
  };
  network_activity: {
    mentions: number;
    influencer_score: string;
    velocity: number;
  };
}
