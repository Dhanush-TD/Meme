import React from 'react';
import { motion } from 'motion/react';
import { Radio, Zap, TrendingUp } from 'lucide-react';

export const SignalsPage: React.FC = () => {
  const signals = [
    { type: 'BULLISH', coin: 'DOGE', strength: 92, time: '2m ago', desc: 'Whale accumulation detected in Tier 1 wallets.' },
    { type: 'NEUTRAL', coin: 'PEPE', strength: 45, time: '5m ago', desc: 'Consolidation phase following 12% rally.' },
    { type: 'BEARISH', coin: 'SHIB', strength: 78, time: '12m ago', desc: 'Social sentiment dropping below 30-day average.' },
    { type: 'BULLISH', coin: 'BONK', strength: 88, time: '15m ago', desc: 'New exchange listing rumors circulating on X.' },
  ];

  return (
    <div className="p-10 max-w-[1200px] mx-auto space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#85adff]/10 border border-[#85adff]/20 rounded-full">
          <Radio size={12} className="text-[#85adff]" />
          <span className="text-[10px] font-bold text-[#85adff] tracking-widest uppercase">Live Intelligence Feed</span>
        </div>
        <h2 className="text-5xl font-black tracking-tighter">Alpha Signals</h2>
        <p className="text-slate-400 max-w-xl">Real-time neural network analysis of social momentum and on-chain movements.</p>
      </motion.div>

      <div className="grid gap-4">
        {signals.map((signal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#101417] border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-[#85adff]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                signal.type === 'BULLISH' ? 'bg-[#5bff49]/10 text-[#5bff49]' : 
                signal.type === 'BEARISH' ? 'bg-red-500/10 text-red-500' : 'bg-slate-500/10 text-slate-500'
              }`}>
                {signal.type === 'BULLISH' ? <TrendingUp size={24} /> : <Zap size={24} />}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl font-black">{signal.coin}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    signal.type === 'BULLISH' ? 'bg-[#5bff49]/20 text-[#5bff49]' : 
                    signal.type === 'BEARISH' ? 'bg-red-500/20 text-red-500' : 'bg-slate-500/20 text-slate-500'
                  }`}>{signal.type}</span>
                </div>
                <p className="text-sm text-slate-400">{signal.desc}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-white">{signal.strength}%</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{signal.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
