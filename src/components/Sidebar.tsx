import React from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, Radio, LayoutGrid, Wallet, Star, Settings, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onProfileClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, onProfileClick }) => {
  const navItems = [
    { icon: Terminal, label: 'Terminal', path: '/' },
    { icon: Radio, label: 'Signals', path: '/signals' },
    { icon: LayoutGrid, label: 'Heatmap', path: '/heatmap' },
    { icon: Wallet, label: 'Portfolio', path: '/portfolio' },
    { icon: Star, label: 'Watchlist', path: '/watchlist' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-[#05070a] border-r border-white/5 flex flex-col z-[70] transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white mb-1">Sovereign Ledger</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#85adff] opacity-70">Elite Tier</p>
          </div>
          <button 
            className="lg:hidden text-slate-500 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-[#85adff] font-bold bg-[#85adff]/10 border-r-2 border-[#85adff]' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={onProfileClick}
            className="w-full flex items-center gap-3 mb-6 p-2 rounded-xl hover:bg-white/5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden shrink-0 group-hover:border-[#85adff]/50 transition-colors">
              <img 
                src="https://picsum.photos/seed/avatar/100/100" 
                alt="Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate group-hover:text-[#85adff] transition-colors">Dominion_Alpha</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Pro Validator</p>
            </div>
          </button>
          <button className="w-full py-3 px-4 bg-[#85adff] text-black font-bold rounded-full text-xs transition-all hover:bg-[#6c9fff] active:scale-95 shadow-[0_0_15px_rgba(133,173,255,0.2)]">
            Connect Wallet
          </button>
        </div>
      </aside>
    </>
  );
};
