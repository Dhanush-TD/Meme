import React from 'react';
import { Bell, User, Search, Menu } from 'lucide-react';

interface TopBarProps {
  onMenuClick: () => void;
  onProfileClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, onProfileClick }) => {
  return (
    <header className="h-16 w-full sticky top-0 z-40 bg-[#0b0e11]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4 md:gap-8">
        <button 
          className="lg:hidden text-slate-400 hover:text-white transition-colors"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <span className="text-[#85adff] font-black text-sm tracking-tight">MemeIntel</span>
        <nav className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span className="hover:text-white cursor-pointer transition-colors">Market Cap</span>
          <span className="hover:text-white cursor-pointer transition-colors">24h Vol</span>
          <span className="text-emerald-400 font-bold cursor-pointer">Gas: 12 gwei</span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input 
            type="text" 
            placeholder="SEARCH ASSETS..." 
            className="bg-black/40 border-none text-[10px] tracking-widest py-2 pl-9 pr-4 w-32 md:w-48 rounded-full focus:ring-1 focus:ring-[#85adff]/40 text-slate-300 placeholder:text-slate-600"
          />
        </div>
        <div className="flex gap-3 text-slate-400">
          <Bell size={18} className="hover:text-white cursor-pointer transition-colors" />
          <User 
            size={18} 
            className="hover:text-white cursor-pointer transition-colors" 
            onClick={onProfileClick}
          />
        </div>
      </div>
    </header>
  );
};
