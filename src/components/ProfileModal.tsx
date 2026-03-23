import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Settings, Shield, LogOut, Wallet } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
          className="relative w-full max-w-md bg-[#101417] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/10 overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/avatar/100/100" 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tighter">Dominion_Alpha</h2>
                  <p className="text-[#85adff] font-bold text-[10px] uppercase tracking-widest">Pro Validator • Tier 3</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-2 mb-8">
              {[
                { icon: User, label: 'Account Details' },
                { icon: Wallet, label: 'Wallet Settings' },
                { icon: Shield, label: 'Security & Privacy' },
                { icon: Settings, label: 'Preferences' },
              ].map((item) => (
                <button 
                  key={item.label}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group"
                >
                  <item.icon size={18} className="group-hover:text-[#85adff] transition-colors" />
                  <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5">
              <button className="w-full flex items-center justify-center gap-3 py-4 bg-[#ff7162]/10 text-[#ff7162] font-bold rounded-2xl text-xs tracking-widest uppercase hover:bg-[#ff7162]/20 transition-all active:scale-95">
                <LogOut size={16} />
                Terminate Session
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
