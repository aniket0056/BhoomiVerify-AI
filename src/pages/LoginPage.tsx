import React, { useState } from 'react';
import { 
  Landmark, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Map as MapIcon, 
  Lock, 
  Mail, 
  ArrowRight, 
  UserCheck, 
  Layers, 
  CheckCircle2,
  Shield,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sampleUsers } from '../data/sampleUsers';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('officer@bhoomiverify.gov.in');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState<UserRole>('Verification Officer');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, role);
      setIsLoading(false);
      if (!success) {
        setError('Invalid credentials or unauthorized officer account.');
      }
    }, 450);
  };

  const handleQuickSelect = (u: typeof sampleUsers[0]) => {
    setEmail(u.email);
    setPassword(u.role === 'Administrator' ? 'admin123' : 'demo123');
    setRole(u.role);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Tricolor top border */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/90">
          
          {/* LEFT HERO SECTION */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
            {/* Subtle background graphic */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              {/* National Emblem & Ministry */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-xl shadow-inner">
                  🏛️
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
                    Ministry of Rural Development
                  </h3>
                  <p className="text-[11px] text-slate-400">Government of India</p>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-extrabold uppercase border border-blue-500/30">
                    National Land Governance
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    DILRMP Standard
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  BhoomiVerify <span className="text-blue-400">AI</span>
                </h1>
                <p className="text-sm font-semibold text-blue-200/90 mt-1">
                  Intelligent Land Record Digitization & Validation
                </p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed max-w-md">
                  Transforming legacy land records into verified, searchable and transparent digital records powered by multilingual neural OCR and cadastral graph verification.
                </p>
              </div>

              {/* 4 Core Pillars Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <FileText className="w-5 h-5 text-sky-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-slate-200">Multilingual OCR</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Kannada, Hindi, Marathi, Tamil & 6 Indic scripts</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <Sparkles className="w-5 h-5 text-amber-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-slate-200">AI Cross-Validation</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Automated discrepancy & anomaly detection</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <MapIcon className="w-5 h-5 text-emerald-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-slate-200">GIS Cadastral Maps</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Satellite parcel & overlap intersection check</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <ShieldCheck className="w-5 h-5 text-purple-400 mb-1.5" />
                  <h4 className="text-xs font-bold text-slate-200">Tamper-Proof Audit</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Role-based governance & timestamped logs</p>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>NIC Secure Gateway Live</span>
              </span>
              <span>256-Bit SHA-2 Encrypted</span>
            </div>
          </div>

          {/* RIGHT LOGIN FORM */}
          <div className="lg:col-span-6 p-8 sm:p-12 bg-white text-slate-900 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="pb-6 border-b border-slate-100">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-3">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorized Government Personnel Only</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Official Officer Login
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your assigned Government ID or select a demo officer persona below.
                </p>
              </div>

              {/* Error Box */}
              {error && (
                <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Officer Email / ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email / Officer ID</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="officer@bhoomiverify.gov.in"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Password / Security PIN</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Official Designation / Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  >
                    <option value="Verification Officer">Verification Officer (Senior Revenue Officer)</option>
                    <option value="Administrator">Administrator (System & IT Directorate)</option>
                    <option value="Land Records Officer">Land Records Officer (Taluk Revenue Office)</option>
                    <option value="Survey Officer">Survey Officer (Cadastral GIS Specialist)</option>
                    <option value="District Authority">District Authority (Deputy Commissioner / DM)</option>
                  </select>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Remember this session</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to registered NIC mail ID.')}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-60"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isLoading ? 'Authenticating with NIC Gateway...' : 'Secure Government Login'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Persona Switcher for Instant Demo Testing */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Quick Login as Demo Government Persona:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {sampleUsers.slice(0, 4).map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickSelect(u)}
                      className={`p-2 rounded-lg border text-left text-xs transition-all ${
                        email === u.email
                          ? 'border-blue-500 bg-blue-50/70 font-bold text-blue-900'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <p className="font-bold truncate text-[11px]">{u.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{u.role}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
              Unauthorized access is punishable under Information Technology Act, 2000 & Official Secrets Act.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <footer className="py-3 px-6 text-center text-xs text-slate-500 border-t border-slate-800">
        © 2026 Ministry of Rural Development, Government of India. Designed for National Land Record Modernization.
      </footer>
    </div>
  );
};
