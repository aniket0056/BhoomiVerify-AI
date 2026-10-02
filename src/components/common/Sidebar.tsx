import React from 'react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  FolderKanban, 
  Sparkles, 
  FileCheck2, 
  Map as MapIcon, 
  CopyCheck, 
  Scale, 
  BarChart3, 
  ShieldAlert, 
  FileSpreadsheet, 
  Users, 
  Settings,
  Landmark,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { useApp, NavTab } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, t, records, disputes, duplicates, currentUser } = useApp();

  const pendingCount = records.filter(r => r.status === 'Pending' || r.status === 'Review Required').length;
  const flaggedCount = records.filter(r => r.status === 'Flagged').length;
  const activeDisputesCount = disputes.filter(d => d.status === 'Active' || d.status === 'In Hearing').length;
  const unmergedDupCount = duplicates.filter(d => d.status === 'Unresolved').length;

  const navItems = [
    { id: 'dashboard' as NavTab, label: t('dashboard'), icon: LayoutDashboard },
    { id: 'digitize' as NavTab, label: t('digitizeRecords'), icon: UploadCloud, badge: 'OCR + AI', badgeColor: 'bg-blue-500/20 text-blue-300' },
    { id: 'records' as NavTab, label: t('landRecords'), icon: FolderKanban, badge: records.length.toString() },
    { id: 'validation' as NavTab, label: t('aiValidation'), icon: Sparkles, badge: flaggedCount > 0 ? `${flaggedCount} Alerts` : undefined, badgeColor: 'bg-amber-500/20 text-amber-300' },
    { id: 'verification' as NavTab, label: t('verificationQueue'), icon: FileCheck2, badge: pendingCount > 0 ? pendingCount.toString() : undefined, badgeColor: 'bg-rose-500/20 text-rose-300' },
    { id: 'gis' as NavTab, label: t('mapGis'), icon: MapIcon },
    { id: 'duplicates' as NavTab, label: t('duplicateDetection'), icon: CopyCheck, badge: unmergedDupCount > 0 ? unmergedDupCount.toString() : undefined, badgeColor: 'bg-amber-500/20 text-amber-300' },
    { id: 'disputes' as NavTab, label: t('disputeRecords'), icon: Scale, badge: activeDisputesCount > 0 ? activeDisputesCount.toString() : undefined, badgeColor: 'bg-purple-500/20 text-purple-300' },
    { id: 'analytics' as NavTab, label: t('analytics'), icon: BarChart3 },
    { id: 'audit' as NavTab, label: t('auditLogs'), icon: ShieldAlert },
    { id: 'reports' as NavTab, label: t('reports'), icon: FileSpreadsheet },
    { id: 'users' as NavTab, label: t('users'), icon: Users },
    { id: 'settings' as NavTab, label: t('settings'), icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 flex items-center justify-center text-white shadow-md">
          <Landmark className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <span className="font-bold text-base text-white tracking-tight">BhoomiVerify</span>
            <span className="px-1.5 py-0.2 rounded bg-blue-500/30 text-blue-400 text-[10px] font-extrabold uppercase">AI</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium truncate">Ministry of Rural Development</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Core Operations
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badgeColor || 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Compliance & Officer Widget */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center space-x-2">
            <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-slate-200 truncate">MoRD Live Node #24</p>
              <p className="text-[10px] text-slate-400 truncate">DILRMP Certified Engine</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] text-slate-400">
            <span>v4.2.0-Enterprise</span>
            <span className="text-emerald-400 font-medium">● 99.9% Uptime</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
