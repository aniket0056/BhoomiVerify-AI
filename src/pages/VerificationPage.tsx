import React, { useState } from 'react';
import { 
  FileCheck2, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  ShieldAlert, 
  Eye, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { OfficerReviewModal } from '../components/verification/OfficerReviewModal';
import { LandRecord, RecordStatus } from '../types';

export const VerificationPage: React.FC = () => {
  const { 
    records, 
    selectedRecordForReview, 
    setSelectedRecordForReview,
    updateRecordStatus,
    selectedDistrict 
  } = useApp();

  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'pending' | 'high_priority' | 'flagged' | 'disputed'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Filter records
  const filtered = records.filter(r => {
    // District filter
    if (selectedDistrict !== 'All Districts' && r.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }

    // Status tabs filter
    if (activeFilterTab === 'pending') {
      if (r.status !== 'Pending' && r.status !== 'Review Required') return false;
    } else if (activeFilterTab === 'high_priority') {
      if (r.riskLevel !== 'HIGH' && r.riskLevel !== 'CRITICAL') return false;
    } else if (activeFilterTab === 'flagged') {
      if (r.status !== 'Flagged') return false;
    } else if (activeFilterTab === 'disputed') {
      if (r.status !== 'Disputed') return false;
    }

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        r.recordId.toLowerCase().includes(q) ||
        r.ownerName.toLowerCase().includes(q) ||
        r.surveyNumber.toLowerCase().includes(q) ||
        r.village.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenReview = (record: LandRecord) => {
    setSelectedRecordForReview(record);
    setIsReviewModalOpen(true);
  };

  const handleQuickApprove = (recordId: string) => {
    updateRecordStatus(recordId, 'Verified', 'Quick approval by Revenue Officer after automated 98%+ AI confidence check.');
  };

  const handleQuickReject = (recordId: string) => {
    updateRecordStatus(recordId, 'Rejected', 'Rejected due to document integrity inconsistency.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
              Officer Workflow
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Queue: <strong className="text-slate-800">{filtered.length} Records</strong>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Cadastral Verification & Approval Queue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review AI extracted documents, verify cadastral matches, resolve anomalies, and issue digital land certificates.
          </p>
        </div>
      </div>

      {/* Main Verification Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden">
        {/* Tabs & Search Strip */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'pending', label: 'Pending Verification', count: records.filter(r => r.status === 'Pending' || r.status === 'Review Required').length },
              { id: 'high_priority', label: 'High Risk / Review Required', count: records.filter(r => r.riskLevel === 'HIGH' || r.riskLevel === 'CRITICAL').length },
              { id: 'flagged', label: 'Flagged Mismatches', count: records.filter(r => r.status === 'Flagged').length },
              { id: 'disputed', label: 'Disputed Parcels', count: records.filter(r => r.status === 'Disputed').length },
              { id: 'all', label: 'All Records', count: records.length },
            ].map((tab) => {
              const isActive = activeFilterTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilterTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Queue (Owner, Survey, Village)..."
              className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Queue Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100/70 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3.5">Record ID</th>
                <th className="px-4 py-3.5">Owner Name</th>
                <th className="px-4 py-3.5">Survey No</th>
                <th className="px-4 py-3.5">District / Village</th>
                <th className="px-4 py-3.5 text-center">Risk Level</th>
                <th className="px-4 py-3.5 text-center">AI Confidence</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5">Submission Date</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-400">
                    No records found in this queue category.
                  </td>
                </tr>
              ) : (
                filtered.map((rec) => (
                  <tr key={rec.recordId} className="hover:bg-blue-50/30 transition-colors">
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
                      <StatusBadge riskLevel={rec.riskLevel} />
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
                    <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenReview(rec)}
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleQuickApprove(rec.recordId)}
                        className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors"
                        title="Quick Approve"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleQuickReject(rec.recordId)}
                        className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors"
                        title="Reject"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Officer Decision Review Modal */}
      <OfficerReviewModal
        record={selectedRecordForReview}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitDecision={(recordId, status, remarks) => {
          updateRecordStatus(recordId, status, remarks);
        }}
      />
    </div>
  );
};
