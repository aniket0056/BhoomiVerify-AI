import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CopyCheck, 
  FileCheck2,
  PieChart as PieIcon,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
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
import { AIEngine } from '../services/aiEngine';

const LAND_TYPE_DISTRIBUTION = [
  { type: 'Agricultural', count: 82400, fill: '#10b981' },
  { type: 'Residential', count: 24100, fill: '#3b82f6' },
  { type: 'Commercial', count: 12800, fill: '#8b5cf6' },
  { type: 'Industrial', count: 6200, fill: '#f59e0b' },
  { type: 'Forest / Public', count: 2950, fill: '#64748b' },
];

const DISTRICT_PERFORMANCE_METRICS = [
  { district: 'Bengaluru Rural', total: 28400, digitized: 24200, verified: 23100, pending: 950, flagged: 150, rate: 85.2 },
  { district: 'Mysuru', total: 34200, digitized: 27800, verified: 25400, pending: 1980, flagged: 420, rate: 81.3 },
  { district: 'Mandya', total: 22100, digitized: 16900, verified: 15800, pending: 880, flagged: 220, rate: 76.5 },
  { district: 'Tumakuru', total: 19800, digitized: 14600, verified: 13900, pending: 540, flagged: 160, rate: 73.7 },
  { district: 'Hassan', total: 14500, digitized: 9800, verified: 9200, pending: 480, flagged: 120, rate: 67.6 },
  { district: 'Shivamogga', total: 9450, digitized: 5120, verified: 4340, pending: 650, flagged: 130, rate: 54.2 },
];

export const AnalyticsPage: React.FC = () => {
  const { records } = useApp();
  const aiInsights = AIEngine.generateAIInsights(records);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
            Data Directorate
          </span>
          <span className="text-xs text-slate-500 font-medium">
            AI Analytics & Cadastral Intelligence
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
          Land Records Modernization Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time metrics, district compliance scores, risk concentrations, and automated AI insights.
        </p>
      </div>

      {/* Top 6 Analytical KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Digitization Rate"
          value="76.6%"
          change="+4.2%"
          isPositive={true}
          icon={TrendingUp}
          colorScheme="blue"
          subtitle="Target: 90% by Q4"
        />
        <StatCard
          title="Verification Rate"
          value="93.2%"
          change="+2.8%"
          isPositive={true}
          icon={FileCheck2}
          colorScheme="emerald"
          subtitle="Approval accuracy"
        />
        <StatCard
          title="Mismatch Rate"
          value="1.8%"
          change="-0.4%"
          isPositive={true}
          icon={AlertTriangle}
          colorScheme="rose"
          subtitle="Cadastral diffs"
        />
        <StatCard
          title="Duplicate Rate"
          value="0.3%"
          change="-0.1%"
          isPositive={true}
          icon={CopyCheck}
          colorScheme="indigo"
          subtitle="Conflict detection"
        />
        <StatCard
          title="Avg AI Confidence"
          value="96.4%"
          change="+1.1%"
          isPositive={true}
          icon={Sparkles}
          colorScheme="amber"
          subtitle="OCR neural model"
        />
        <StatCard
          title="Avg Processing"
          value="2.8s"
          change="-0.6s"
          isPositive={true}
          icon={Clock}
          colorScheme="slate"
          subtitle="Per multi-page deed"
        />
      </div>

      {/* AI INSIGHTS PANEL */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            AI Automated Insights & Policy Recommendations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {aiInsights.map((ins) => (
            <div
              key={ins.id}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                    {ins.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{ins.trend}</span>
                </div>
                <h5 className="text-xs font-bold text-slate-900">{ins.title}</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ins.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Land Type Distribution */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-1">
            Cadastral Records by Land Classification
          </h3>
          <p className="text-xs text-slate-500 mb-4">Total registered land parcels categorized by statutory land use.</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LAND_TYPE_DISTRIBUTION}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="type" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(v: any) => Number(v).toLocaleString('en-IN')} />
                <Bar dataKey="count" name="Total Parcels" radius={[4, 4, 0, 0]}>
                  {LAND_TYPE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification Activity Trend */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-1">
            Weekly Validation & Approval Velocity
          </h3>
          <p className="text-xs text-slate-500 mb-4">Cadastral files processed and approved by Revenue Officers.</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { day: 'Mon', verified: 340, flagged: 12 },
                  { day: 'Tue', verified: 480, flagged: 18 },
                  { day: 'Wed', verified: 520, flagged: 15 },
                  { day: 'Thu', verified: 610, flagged: 22 },
                  { day: 'Fri', verified: 590, flagged: 19 },
                  { day: 'Sat', verified: 280, flagged: 8 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="verified" name="Verified Records" stroke="#059669" strokeWidth={2.5} />
                <Line type="monotone" dataKey="flagged" name="Flagged Discrepancies" stroke="#e11d48" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* DISTRICT PERFORMANCE TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            District Performance & Modernization Scorecard
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cadastral digitization progress and pending verification backlog across districts.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100/70 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3.5">District</th>
                <th className="px-4 py-3.5 text-right">Total Parcels</th>
                <th className="px-4 py-3.5 text-right">Digitized</th>
                <th className="px-4 py-3.5 text-right">Verified</th>
                <th className="px-4 py-3.5 text-right">Pending Queue</th>
                <th className="px-4 py-3.5 text-right">Flagged</th>
                <th className="px-4 py-3.5 w-48">Digitization Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {DISTRICT_PERFORMANCE_METRICS.map((d) => (
                <tr key={d.district} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {d.district}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {d.total.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-blue-700 font-semibold">
                    {d.digitized.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-emerald-700 font-semibold">
                    {d.verified.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-amber-700 font-semibold">
                    {d.pending.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-rose-700 font-semibold">
                    {d.flagged.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${d.rate}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-900 text-xs w-10 text-right">{d.rate}%</span>
                    </div>
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
