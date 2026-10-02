import React from 'react';
import { 
  FolderKanban, 
  UploadCloud, 
  FileCheck2, 
  AlertTriangle, 
  CopyCheck, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Download,
  Filter,
  Eye,
  MapPin
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { LandRecord } from '../types';

// Mock chart datasets
const MONTHLY_DIGITIZATION_DATA = [
  { month: 'Apr', manual: 4200, aiDigitized: 8400, verified: 7800 },
  { month: 'May', manual: 3800, aiDigitized: 11200, verified: 10400 },
  { month: 'Jun', manual: 2900, aiDigitized: 14800, verified: 13900 },
  { month: 'Jul', manual: 2100, aiDigitized: 17600, verified: 16800 },
  { month: 'Aug', manual: 1800, aiDigitized: 21400, verified: 20100 },
  { month: 'Sep', manual: 1200, aiDigitized: 24800, verified: 23200 },
];

const DISTRICT_PERFORMANCE_DATA = [
  { district: 'Bengaluru Rural', total: 28400, digitized: 24200, percentage: 85.2 },
  { district: 'Mysuru', total: 34200, digitized: 27800, percentage: 81.3 },
  { district: 'Mandya', total: 22100, digitized: 16900, percentage: 76.5 },
  { district: 'Tumakuru', total: 19800, digitized: 14600, percentage: 73.7 },
  { district: 'Hassan', total: 14500, digitized: 9800, percentage: 67.6 },
  { district: 'Shivamogga', total: 9450, digitized: 5120, percentage: 54.2 },
];

const STATUS_DISTRIBUTION_DATA = [
  { name: 'Verified', value: 91740, color: '#059669' },
  { name: 'Pending Review', value: 4285, color: '#d97706' },
  { name: 'Flagged / Anomaly', value: 1248, color: '#e11d48' },
  { name: 'Disputed', value: 1147, color: '#7c3aed' },
];

const CONFIDENCE_DISTRIBUTION_DATA = [
  { tier: 'High (90%-100%)', count: 86420, fill: '#10b981' },
  { tier: 'Medium (75%-89%)', count: 10840, fill: '#f59e0b' },
  { tier: 'Low (<75%)', count: 1160, fill: '#ef4444' },
];

export const DashboardPage: React.FC = () => {
  const { 
    records, 
    selectedDistrict, 
    setActiveTab, 
    setSelectedRecordForDetail, 
    setSelectedRecordForReview,
    currentUser 
  } = useApp();

  const filteredRecords = selectedDistrict === 'All Districts' 
    ? records 
    : records.filter(r => r.district.toLowerCase() === selectedDistrict.toLowerCase());

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
              Operational Overview
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Filtered by: <strong className="text-slate-800">{selectedDistrict}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Land Records Intelligence Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time cadastral digitization telemetry, neural OCR metrics, and automated cross-verification status.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('digitize')}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Digitize New Record</span>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Analytics</span>
          </button>
        </div>
      </div>

      {/* AI Intelligence Insights Highlight Strip */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white shadow-gov flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                AI Automated Surveillance Alert
              </span>
              <span className="px-2 py-0.2 rounded-full bg-rose-500/30 text-rose-300 text-[10px] font-bold">
                Action Required
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-1">
              <strong>Demo Case Alert:</strong> Survey <strong>82/4A</strong> in Rampura (Mysuru) has a <span className="text-amber-300 font-semibold">0.06 Acre area mismatch</span> between the 1998 scanned deed (2.45 Ac) and State Database (2.51 Ac).
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const demoRec = records.find(r => r.recordId === 'LR-2026-58421') || records[0];
            setSelectedRecordForReview(demoRec);
          }}
          className="px-3.5 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shrink-0 transition-colors shadow-xs flex items-center gap-1"
        >
          <span>Inspect Case</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 6 Key KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Records"
          value="1,28,450"
          change="+8.4%"
          isPositive={true}
          icon={FolderKanban}
          colorScheme="slate"
          subtitle="All cadastral parcels"
          onClick={() => setActiveTab('records')}
        />
        <StatCard
          title="Digitized Records"
          value="98,420"
          change="+12.1%"
          isPositive={true}
          icon={UploadCloud}
          colorScheme="blue"
          subtitle="76.6% completion"
          onClick={() => setActiveTab('digitize')}
        />
        <StatCard
          title="Pending Verification"
          value="4,285"
          change="-3.2%"
          isPositive={true}
          icon={FileCheck2}
          colorScheme="amber"
          subtitle="Officer queue"
          onClick={() => setActiveTab('verification')}
        />
        <StatCard
          title="Verified Records"
          value="91,740"
          change="+14.6%"
          isPositive={true}
          icon={FileCheck2}
          colorScheme="emerald"
          subtitle="93.2% approval rate"
          onClick={() => setActiveTab('records')}
        />
        <StatCard
          title="Flagged Records"
          value="1,248"
          change="+2.1%"
          isPositive={false}
          icon={AlertTriangle}
          colorScheme="rose"
          subtitle="Anomalies detected"
          onClick={() => setActiveTab('validation')}
        />
        <StatCard
          title="Duplicate Records"
          value="372"
          change="-8.5%"
          isPositive={true}
          icon={CopyCheck}
          colorScheme="indigo"
          subtitle="17 new this week"
          onClick={() => setActiveTab('duplicates')}
        />
      </div>

      {/* Charts Grid: Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Digitization Progress Over Time */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Digitization & Verification Velocity
              </h3>
              <p className="text-xs text-slate-500">Monthly breakdown of AI OCR extracted vs officer verified land records.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              +19.8% Speedup
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_DIGITIZATION_DATA}>
                <defs>
                  <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorVer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="aiDigitized" name="AI Digitized Records" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorAi)" />
                <Area type="monotone" dataKey="verified" name="Verified Records" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorVer)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Verification Status Donut */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-gov flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Cadastral Verification Status
            </h3>
            <p className="text-xs text-slate-500">Distribution across active land parcel portfolio.</p>
          </div>

          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATUS_DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {STATUS_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => Number(value).toLocaleString('en-IN')} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 leading-none">93.2%</span>
              <span className="text-[10px] font-bold text-emerald-700 mt-0.5">Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            {STATUS_DISTRIBUTION_DATA.map(item => (
              <div key={item.name} className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Grid: Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 4: District-wise Digitization */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                District-Wise Digitization Rate
              </h3>
              <p className="text-xs text-slate-500">Benchmark across priority Karnataka districts.</p>
            </div>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DISTRICT_PERFORMANCE_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} unit="%" stroke="#64748b" fontSize={11} />
                <YAxis dataKey="district" type="category" stroke="#64748b" fontSize={11} width={110} />
                <Tooltip formatter={(v: any) => `${v}% Digitized`} />
                <Bar dataKey="percentage" name="Completion Rate (%)" fill="#0284c7" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: AI Confidence Distribution */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Neural OCR Confidence Distribution
              </h3>
              <p className="text-xs text-slate-500">Classification of legacy scanned records by AI confidence tier.</p>
            </div>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CONFIDENCE_DISTRIBUTION_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="tier" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(v: any) => Number(v).toLocaleString('en-IN')} />
                <Bar dataKey="count" name="Total Records" radius={[4, 4, 0, 0]}>
                  {CONFIDENCE_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Recent Land Record Processing & AI Validations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live audit stream of recently digitized and verified cadastral files.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('records')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Records ({records.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100/60 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3.5">Record ID</th>
                <th className="px-4 py-3.5">Owner Name</th>
                <th className="px-4 py-3.5">Survey No</th>
                <th className="px-4 py-3.5">Village / District</th>
                <th className="px-4 py-3.5 text-center">AI Confidence</th>
                <th className="px-4 py-3.5 text-center">Validation Status</th>
                <th className="px-4 py-3.5">Last Updated</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRecords.slice(0, 7).map((rec) => (
                <tr key={rec.recordId} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-blue-900">
                    {rec.recordId}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {rec.ownerName}
                  </td>
                  <td className="px-4 py-3 font-bold text-blue-700">
                    {rec.surveyNumber}
                  </td>
                  <td className="px-4 py-3">
                    <span>{rec.village}</span>, <span className="text-slate-500">{rec.district}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge confidence={rec.validationScore} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={rec.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px]">
                    {rec.lastUpdated}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => setSelectedRecordForDetail(rec)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                      title="View Details"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setSelectedRecordForReview(rec)}
                      className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
                      title="Review Decision"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
