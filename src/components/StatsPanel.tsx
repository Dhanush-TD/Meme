import React from 'react';
import { Network } from 'lucide-react';

interface StatsPanelProps {
  sentiment: { label: string; score: number };
  activity: { mentions: number; influencer_score: string; velocity: number };
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ sentiment, activity }) => {
  const getMarketOutlook = (score: number) => {
    if (score > 80) return "Market is overheated. High risk of correction. Neural nodes suggest profit taking.";
    if (score > 60) return "Bullish momentum continues. Sentiment is positive, but monitor whale outflows.";
    if (score > 40) return "Neutral accumulation phase. Market is searching for clear direction.";
    return "Fear is dominant. Potential accumulation opportunity for long-term holders.";
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Aggregate Sentiment */}
      <div className="bg-[#1c2024] rounded-2xl p-6 border-l-4 border-[#85adff] flex-1 flex flex-col justify-center">
        <p className="text-[10px] font-bold text-[#85adff] tracking-widest uppercase mb-1">Aggregate Sentiment</p>
        <h4 className="text-2xl font-black text-white mb-3 tracking-tighter">{sentiment.label}</h4>
        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-gradient-to-r from-[#85adff] to-[#5bff49] transition-all duration-1000 shadow-[0_0_12px_rgba(133,173,255,0.4)]"
            style={{ width: `${sentiment.score}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-slate-500 tracking-widest mb-4">
          <span>FEAR</span>
          <span>{Math.round(sentiment.score)}/100</span>
        </div>
        
        <div className="pt-4 border-t border-white/5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Market Outlook</p>
          <p className="text-[10px] text-slate-400 leading-relaxed italic">
            "{getMarketOutlook(sentiment.score)}"
          </p>
        </div>
      </div>

      {/* Network Activity */}
      <div className="bg-[#101417] rounded-2xl p-6 relative overflow-hidden group border border-white/5 flex-1 flex flex-col justify-center">
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
          <Network size={140} />
        </div>
        <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-6">Network Activity</p>
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-3">
            <span className="text-xs text-slate-400">New Mentions (1h)</span>
            <span className="text-xl font-black text-white">{(activity.mentions / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex justify-between items-end border-b border-white/5 pb-3">
            <span className="text-xs text-slate-400">Top Influencer Buzz</span>
            <span className="text-xl font-black text-[#5bff49]">{activity.influencer_score}</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-xs text-slate-400">Meme Velocity</span>
            <span className="text-xl font-black text-white">{activity.velocity}x Avg</span>
          </div>
        </div>
      </div>
    </div>
  );
};
