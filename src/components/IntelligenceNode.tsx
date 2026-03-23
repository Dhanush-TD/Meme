import React from 'react';
import { CoinData } from '../types';

interface IntelligenceNodeProps {
  coin: CoinData;
  onClick: (coin: CoinData) => void;
}

export const IntelligenceNode: React.FC<IntelligenceNodeProps> = ({ coin, onClick }) => {
  const getPredictionColor = (pred: string) => {
    switch (pred) {
      case 'BUY': return 'text-[#5bff49] bg-[#5bff49]/10';
      case 'SELL': return 'text-[#ff7162] bg-[#ff7162]/10';
      default: return 'text-[#85adff] bg-[#85adff]/10';
    }
  };

  const getSentimentColor = (sent: string) => {
    if (sent.includes('Bull')) return 'text-[#5bff49]';
    if (sent.includes('Bear')) return 'text-[#ff7162]';
    return 'text-slate-400';
  };

  return (
    <div 
      onClick={() => onClick(coin)}
      className="bg-[#101417] hover:bg-[#161a1e] transition-all duration-300 rounded-2xl p-6 group border border-white/5 cursor-pointer active:scale-[0.98]"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-[#22262b] rounded-xl flex items-center justify-center text-2xl font-black text-white group-hover:scale-110 transition-transform">
          {coin.coin[0]}
        </div>
        <div className={`px-3 py-1 text-[10px] font-bold rounded-full tracking-widest uppercase ${getPredictionColor(coin.prediction)}`}>
          {coin.prediction}
        </div>
      </div>

      <div className="mb-6">
        <h5 className="text-xs font-bold text-slate-500 tracking-tight mb-1 uppercase">{coin.coin}</h5>
        <p className="text-2xl font-black text-white tracking-tighter">
          ${coin.price < 1 ? coin.price.toFixed(8) : coin.price.toFixed(4)}
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <div>
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            <span>Confidence</span>
            <span className="text-white">{coin.confidence}%</span>
          </div>
          <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${coin.prediction === 'SELL' ? 'bg-[#ff7162]' : 'bg-[#5bff49]'}`} 
              style={{ width: `${coin.confidence}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sentiment</span>
          <span className={`text-xs font-bold ${getSentimentColor(coin.sentiment)}`}>{coin.sentiment}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Meme Score</span>
          <span className="text-xs font-bold text-white">{coin.meme_score}/10</span>
        </div>
      </div>
    </div>
  );
};
