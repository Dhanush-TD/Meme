import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Zap, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { CoinData } from '../types';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: CoinData[];
  onSaveAlert: (alert: any) => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, coins, onSaveAlert }) => {
  const [selectedCoin, setSelectedCoin] = useState(coins[0]?.coin || '');
  const [alertType, setAlertType] = useState('price');
  const [value, setValue] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!value) return;
    onSaveAlert({
      coin: selectedCoin,
      type: alertType,
      value: value,
      timestamp: new Date().toISOString()
    });
    onClose();
  };

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
          className="relative w-full max-w-lg bg-[#101417] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#85adff]/10 rounded-xl flex items-center justify-center text-[#85adff]">
                  <Bell size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tighter">New Alert</h2>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Intelligence Monitoring</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Target Asset</label>
                <select 
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white focus:ring-1 focus:ring-[#85adff]/40 outline-none"
                >
                  {coins.map(c => (
                    <option key={c.coin} value={c.coin}>{c.coin}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Alert Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['price', 'sentiment', 'volume'].map(type => (
                    <button
                      key={type}
                      onClick={() => setAlertType(type)}
                      className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                        alertType === type 
                          ? 'bg-[#85adff] text-black' 
                          : 'bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                  {alertType === 'price' ? 'Target Price ($)' : alertType === 'sentiment' ? 'Sentiment Score (0-100)' : 'Volume Increase (%)'}
                </label>
                <input 
                  type="number"
                  placeholder="Enter value..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white focus:ring-1 focus:ring-[#85adff]/40 outline-none placeholder:text-slate-600"
                />
              </div>

              <div className="bg-[#85adff]/5 rounded-xl p-4 border border-[#85adff]/10 flex gap-3">
                <Info size={18} className="text-[#85adff] shrink-0" />
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Our neural network will continuously monitor the {selectedCoin} {alertType} and notify you immediately when the threshold is crossed.
                </p>
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={!value}
              className="w-full py-4 bg-[#85adff] text-black font-bold rounded-2xl text-xs tracking-widest uppercase hover:bg-[#6c9fff] transition-all active:scale-95 shadow-[0_0_20px_rgba(133,173,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Initialize Monitor
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
