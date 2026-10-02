import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Filter, 
  Gavel, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  UserPlus, 
  ShieldAlert,
  Eye,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DisputeDetailModal } from '../components/disputes/DisputeDetailModal';
import { StatusBadge } from '../components/common/StatusBadge';
import { DisputeRecord } from '../types';

export const DisputeRecordsPage: React.FC = () => {
  const { disputes, updateDisputeStatus, selectedDistrict } = useApp();
  const [selectedDispute, setSelectedDispute] = useState<DisputeRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredDisputes = disputes.filter(d => {
    if (selectedDistrict !== 'All Districts' && d.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }
    if (statusFilter !== 'all' && d.status !== statusFilter) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        d.disputeId.toLowerCase().includes(q) ||
        d.surveyNumber.toLowerCase().includes(q) ||
        d.claimant.toLowerCase().includes(q) ||
        d.respondent.toLowerCase().includes(q) ||
        d.village.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDispute = (disp: DisputeRecord) => {
    setSelectedDispute(disp);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase">
              Judicial & Revenue Grievances
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Active Litigations: <strong className="text-slate-800">{filteredDisputes.length} Cases</strong>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Disputed Land Records & Litigation Registry
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track civil court injunctions, ancestral coparcenary claims, boundary encroachments, and hearing orders.
          </p>
        </div>

        <button
          onClick={() => alert('New dispute registration form initialized.')}
          className="px-3.5 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>File Land Dispute</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden">
        {/* Filters */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-3 flex-wrap">
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Disputes by Case ID, Party, Survey..."
                className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center space-x-1.5 text-xs">
              <span className="font-bold text-slate-600">Case Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-1.5 bg-white border border-slate-300 rounded font-semibold text-slate-800 focus:outline-hidden"
              >
                <option value="all">All Cases</option>
                <option value="Active">Active</option>
                <option value="In Hearing">In Hearing</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Disputes Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100/70 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3.5">Dispute ID</th>
                <th className="px-4 py-3.5">Survey No</th>
                <th className="px-4 py-3.5">Dispute Type & Court Ref</th>
                <th className="px-4 py-3.5">Parties (Claimant vs Respondent)</th>
                <th className="px-4 py-3.5">Village / District</th>
                <th className="px-4 py-3.5 text-center">Priority</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5">Next Hearing</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredDisputes.map((disp) => (
                <tr key={disp.disputeId} className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-purple-900">
                    {disp.disputeId}
                  </td>
                  <td className="px-4 py-3 font-bold text-blue-700">
                    {disp.surveyNumber}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{disp.disputeType}</p>
                    <p className="text-[10px] text-slate-500 truncate max-w-xs">{disp.courtCaseNumber}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-slate-900 font-semibold">{disp.claimant}</p>
                    <p className="text-[10px] text-slate-500">vs {disp.respondent}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p>{disp.village}</p>
                    <p className="text-[10px] text-slate-500">{disp.district}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      disp.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {disp.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={disp.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-[11px]">
                    {disp.hearingDate || 'TBD'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleOpenDispute(disp)}
                      className="px-3 py-1 rounded bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs transition-colors"
                    >
                      View Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispute Detail Modal */}
      <DisputeDetailModal
        dispute={selectedDispute}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={updateDisputeStatus}
      />
    </div>
  );
};
