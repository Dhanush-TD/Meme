import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, TrendingUp, BarChart3 } from 'lucide-react';

export const HeatmapPage: React.FC = () => {
  const heatmapData = [
    { coin: 'DOGE', price: 0.1642, change: 12.4, size: 'w-full h-full' },
    { coin: 'PEPE', price: 0.0000084, change: 4.2, size: 'w-full h-full' },
    { coin: 'SHIB', price: 0.0000271, change: -2.1, size: 'w-full h-full' },
    { coin: 'BONK', price: 0.000024, change: 18.9, size: 'w-full h-full' },
    { coin: 'FLOKI', price: 0.00019, change: 0.0, size: 'w-full h-full' },
  ];

  return (
    <div className="p-10 max-w-[1200px] mx-auto space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#85adff]/10 border border-[#85adff]/20 rounded-full">
          <LayoutGrid size={12} className="text-[#85adff]" />
          <span className="text-[10px] font-bold text-[#85adff] tracking-widest uppercase">Global Market Dominance</span>
        </div>
        <h2 className="text-5xl font-black tracking-tighter">Market Heatmap</h2>
        <p className="text-slate-400 max-w-xl">Visual representation of market capitalization and 24h performance across the meme ecosystem.</p>
      </motion.div>

      <div className="grid grid-cols-12 grid-rows-6 h-[600px] gap-4">
        <div className="col-span-8 row-span-4 bg-[#5bff49]/10 border border-[#5bff49]/20 rounded-3xl p-8 flex flex-col justify-between group hover:bg-[#5bff49]/20 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <h3 className="text-6xl font-black text-white">DOGE</h3>
            <span className="text-2xl font-black text-[#5bff49]">+12.4%</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-400">Market Cap</p>
              <p className="text-2xl font-black text-white">$24.8B</p>
            </div>
            <TrendingUp size={48} className="text-[#5bff49] opacity-20 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="col-span-4 row-span-3 bg-[#85adff]/10 border border-[#85adff]/20 rounded-3xl p-8 flex flex-col justify-between group hover:bg-[#85adff]/20 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <h3 className="text-4xl font-black text-white">PEPE</h3>
            <span className="text-xl font-black text-[#85adff]">+4.2%</span>
          </div>
          <BarChart3 size={32} className="text-[#85adff] opacity-20 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="col-span-4 row-span-3 bg-red-500/10 border border-red-500/20 rounded-3xl p-8 flex flex-col justify-between group hover:bg-red-500/20 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <h3 className="text-4xl font-black text-white">SHIB</h3>
            <span className="text-xl font-black text-red-500">-2.1%</span>
          </div>
          <BarChart3 size={32} className="text-red-500 opacity-20 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="col-span-4 row-span-2 bg-[#5bff49]/10 border border-[#5bff49]/20 rounded-3xl p-6 flex flex-col justify-between group hover:bg-[#5bff49]/20 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-black text-white">BONK</h3>
            <span className="text-lg font-black text-[#5bff49]">+18.9%</span>
          </div>
        </div>
        <div className="col-span-4 row-span-2 bg-slate-500/10 border border-slate-500/20 rounded-3xl p-6 flex flex-col justify-between group hover:bg-slate-500/20 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-black text-white">FLOKI</h3>
            <span className="text-lg font-black text-slate-500">0.0%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
