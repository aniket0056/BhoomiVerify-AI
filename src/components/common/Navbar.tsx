import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Languages, 
  Bell, 
  ChevronDown, 
  UserCheck, 
  LogOut, 
  FileCheck2, 
  UploadCloud,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supportedLanguages } from '../../data/translations';
import { NotificationDrawer } from './NotificationDrawer';
import { sampleUsers } from '../../data/sampleUsers';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    logout, 
    switchRole, 
    selectedDistrict, 
    setSelectedDistrict, 
    currentLanguage, 
    setCurrentLanguage,
    searchQuery,
    setSearchQuery,
    setActiveTab,
    notifications,
    records
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Extract unique districts from records + default
  const districts = ['All Districts', 'Mysuru', 'Mandya', 'Bengaluru Rural', 'Tumakuru', 'Hassan', 'Shivamogga', 'Pune', 'Varanasi'];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('records');
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-gov-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Search Box */}
        <div className="flex-1 max-w-lg">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Survey No (e.g. 82/4A), Owner (Ramesh Kumar), Khata, Village..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                ✕
              </button>
            )}
          </form>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Action: Digitize Record */}
          <button
            onClick={() => setActiveTab('digitize')}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Digitize Record</span>
          </button>

          {/* District Selector */}
          <div className="relative">
            <div className="flex items-center bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200 px-2.5 py-1.5 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-slate-500 mr-1.5 shrink-0" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
              >
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
              title="Select Portal Language"
            >
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">
                {supportedLanguages.find(l => l.code === currentLanguage)?.nativeName || 'English'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Language (10 Indic Scripts)
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {supportedLanguages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                        currentLanguage === lang.code ? 'bg-blue-50/80 font-bold text-blue-700' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.nativeName} ({lang.name})</span>
                      <span className="text-[10px] text-slate-400">{lang.region}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications Center"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
              )}
            </button>
            <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>

          {/* Officer Profile & Role Switcher */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {currentUser?.name.split(' ').map(n => n[0]).slice(0, 2).join('') || 'OF'}
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-slate-900 leading-none">{currentUser?.name}</p>
                <p className="text-[11px] text-blue-600 font-medium leading-tight mt-0.5">{currentUser?.role}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="px-4 py-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      {currentUser?.name.split(' ').map(n => n[0]).slice(0, 2).join('') || 'OF'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                      <p className="text-[11px] text-slate-500">{currentUser?.email}</p>
                      <span className="inline-block mt-0.5 px-2 py-0.2 rounded-sm bg-blue-50 text-blue-700 text-[10px] font-semibold">
                        {currentUser?.employeeId} • {currentUser?.district}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Role Switcher */}
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Switch Government Role (Demo)
                  </p>
                  <div className="space-y-1">
                    {(['Verification Officer', 'Administrator', 'Land Records Officer', 'Survey Officer', 'District Authority'] as UserRole[]).map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          switchRole(role);
                          setIsProfileMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                          currentUser?.role === role
                            ? 'bg-blue-50 text-blue-700 font-bold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{role}</span>
                        {currentUser?.role === role && <UserCheck className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Secure Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
