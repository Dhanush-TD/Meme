import React from 'react';
import { TrendingUp } from 'lucide-react';
import { CoinData } from '../types';

interface HeatmapProps {
  coins: CoinData[];
}

export const Heatmap: React.FC<HeatmapProps> = ({ coins }) => {
  const doge = coins.find(c => c.coin === 'DOGE');
  const shib = coins.find(c => c.coin === 'SHIB');
  const pepe = coins.find(c => c.coin === 'PEPE');
  const floki = coins.find(c => c.coin === 'FLOKI');
  const bonk = coins.find(c => c.coin === 'BONK');

  return (
    <div className="bg-[#101417] rounded-2xl overflow-hidden border border-white/5">
      <div className="p-6 flex justify-between items-center bg-white/5">
        <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">Market Momentum Heatmap</h3>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#5bff49]"></span>
          <span className="w-3 h-3 rounded-sm bg-[#5bff49]/60"></span>
          <span className="w-3 h-3 rounded-sm bg-slate-700"></span>
          <span className="w-3 h-3 rounded-sm bg-[#ff7162]/60"></span>
          <span className="w-3 h-3 rounded-sm bg-[#ff7162]"></span>
        </div>
      </div>

      <div className="h-[500px] grid grid-cols-4 grid-rows-2 gap-1 p-1">
        {/* DOGE - Main Block */}
        <div className="col-span-2 row-span-2 bg-[#5bff49]/10 hover:bg-[#5bff49]/20 transition-all duration-500 p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-5xl font-black text-[#5bff49] tracking-tighter mb-1">{doge?.coin}</p>
            <p className="text-xs text-[#5bff49]/60 font-medium">Dominance: {doge?.dominance}%</p>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold text-white mb-1">${doge?.price.toFixed(4)}</p>
            <p className="text-lg font-bold text-[#5bff49]">+{doge?.change_24h.toFixed(1)}%</p>
          </div>
        </div>

        {/* SHIB */}
        <div className="bg-[#ff7162]/10 hover:bg-[#ff7162]/20 transition-all p-6 flex flex-col justify-between">
          <p className="text-2xl font-black text-[#ff7162] tracking-tighter">{shib?.coin}</p>
          <div>
            <p className="text-lg font-bold text-white">${shib?.price.toFixed(6)}</p>
            <p className="text-sm font-bold text-[#ff7162]">{shib?.change_24h.toFixed(1)}%</p>
          </div>
        </div>

        {/* PEPE */}
        <div className="bg-[#5bff49]/5 hover:bg-[#5bff49]/10 transition-all p-6 flex flex-col justify-between">
          <p className="text-2xl font-black text-slate-400 tracking-tighter">{pepe?.coin}</p>
          <div>
            <p className="text-lg font-bold text-white">${pepe?.price.toFixed(8)}</p>
            <p className="text-sm font-bold text-[#5bff49]">+{pepe?.change_24h.toFixed(1)}%</p>
          </div>
        </div>

        {/* FLOKI */}
        <div className="bg-white/5 hover:bg-white/10 transition-all p-6 flex flex-col justify-between">
          <p className="text-2xl font-black text-slate-500 tracking-tighter">{floki?.coin}</p>
          <div>
            <p className="text-lg font-bold text-white">${floki?.price.toFixed(5)}</p>
            <p className="text-sm font-bold text-slate-500">{floki?.change_24h.toFixed(1)}%</p>
          </div>
        </div>

        {/* BONK */}
        <div className="bg-[#5bff49]/15 hover:bg-[#5bff49]/25 transition-all p-6 flex flex-col justify-between">
          <p className="text-2xl font-black text-[#5bff49] tracking-tighter">{bonk?.coin}</p>
          <div>
            <p className="text-lg font-bold text-white">${bonk?.price.toFixed(6)}</p>
            <p className="text-sm font-bold text-[#5bff49]">+{bonk?.change_24h.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
