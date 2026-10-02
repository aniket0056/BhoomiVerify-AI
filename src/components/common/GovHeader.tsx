import React from 'react';
import { Shield, Sparkles, Database } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GovHeader: React.FC = () => {
  const { currentLanguage } = useApp();

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-200 text-xs select-none">
      {/* Tricolor top strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          {/* Government of India Emblem Symbol */}
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-[10px]">
              🏛️
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="font-semibold text-slate-100 tracking-wide">भारत सरकार | Government of India</span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="text-slate-400">ग्रामीण विकास मंत्रालय | Ministry of Rural Development</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300">DILRMP Certified Cadastral Database</span>
          </div>
          <div className="hidden md:flex items-center space-x-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium">Secure Intranet Gateway (NIC Node 4)</span>
          </div>
          <div className="hidden lg:flex items-center space-x-1 text-slate-300">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>256-Bit Encrypted Audit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
