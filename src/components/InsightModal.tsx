import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, TrendingDown, Info, Zap, BarChart3 } from 'lucide-react';
import { CoinData } from '../types';

interface InsightModalProps {
  coin: CoinData | null;
  onClose: () => void;
  wishlist: string[];
  onToggleWishlist: (coinSymbol: string) => void;
}

export const InsightModal: React.FC<InsightModalProps> = ({ coin, onClose, wishlist, onToggleWishlist }) => {
  if (!coin) return null;

  const isInWishlist = wishlist.includes(coin.coin);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#101417] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#22262b] rounded-2xl flex items-center justify-center text-3xl font-black text-white">
                  {coin.coin[0]}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter">{coin.coin}</h2>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Intelligence Insight</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Current Position</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-white">${coin.price < 1 ? coin.price.toFixed(8) : coin.price.toFixed(4)}</span>
                    <span className={`text-sm font-bold flex items-center gap-1 ${coin.change_24h >= 0 ? 'text-[#5bff49]' : 'text-[#ff7162]'}`}>
                      {coin.change_24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {Math.abs(coin.change_24h).toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${coin.prediction === 'BUY' ? 'bg-[#5bff49]/5 border-[#5bff49]/20' : coin.prediction === 'SELL' ? 'bg-[#ff7162]/5 border-[#ff7162]/20' : 'bg-[#85adff]/5 border-[#85adff]/20'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={16} className={coin.prediction === 'BUY' ? 'text-[#5bff49]' : coin.prediction === 'SELL' ? 'text-[#ff7162]' : 'text-[#85adff]'} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Neural Prediction</span>
                  </div>
                  <p className={`text-xl font-black ${coin.prediction === 'BUY' ? 'text-[#5bff49]' : coin.prediction === 'SELL' ? 'text-[#ff7162]' : 'text-[#85adff]'}`}>
                    {coin.prediction} WITH {coin.confidence}% CONFIDENCE
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Contributing Factors</p>
                  <div className="space-y-4">
                    {(coin.factors || [
                      { label: 'Social Buzz', value: 85 },
                      { label: 'Whale Activity', value: 62 },
                      { label: 'Meme Velocity', value: 94 }
                    ]).map((factor, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] font-bold text-white uppercase tracking-widest mb-2">
                          <span>{factor.label}</span>
                          <span>{factor.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${factor.value}%` }}
                            className="h-full bg-[#85adff]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-6 border border-white/5 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#85adff]/10 rounded-lg text-[#85adff]">
                  <Info size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Strategic Intelligence</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {coin.detailed_insight || `Our neural network has detected a ${coin.purchase_trend || 'stable increase'} in accumulation patterns. The current sentiment is ${coin.sentiment} with a meme score of ${coin.meme_score}/10. This indicates a high probability of short-term volatility based on social momentum.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-[#85adff] text-black font-bold rounded-2xl text-xs tracking-widest uppercase hover:bg-[#6c9fff] transition-all active:scale-95">
                Execute Trade
              </button>
              <button 
                onClick={() => onToggleWishlist(coin.coin)}
                className={`flex-1 py-4 font-bold rounded-2xl text-xs tracking-widest uppercase transition-all active:scale-95 border ${
                  isInWishlist 
                    ? 'bg-[#85adff]/20 text-[#85adff] border-[#85adff]/30' 
                    : 'bg-white/5 text-white border-white/5 hover:bg-white/10'
                }`}
              >
                {isInWishlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
