import React, { useState } from 'react';
import { 
  CopyCheck, 
  AlertTriangle, 
  Search, 
  GitMerge, 
  Split, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DuplicateComparisonModal } from '../components/duplicates/DuplicateComparisonModal';
import { DuplicateRecordPair } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';

export const DuplicateDetectionPage: React.FC = () => {
  const { duplicates, resolveDuplicatePair } = useApp();
  const [selectedPair, setSelectedPair] = useState<DuplicateRecordPair | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenComparison = (pair: DuplicateRecordPair) => {
    setSelectedPair(pair);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase">
              Cadastral Integrity Surveillance
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Active Conflicts: <strong className="text-slate-800">{duplicates.length} Pairs</strong>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Duplicate & Conflict Detection Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            AI-driven spatial intersection, phonetic owner match, and mutation sequence conflict identification.
          </p>
        </div>
      </div>

      {/* Duplicate Pairs Grid */}
      <div className="space-y-4">
        {duplicates.map((pair) => {
          const isResolved = pair.status !== 'Unresolved';

          return (
            <div
              key={pair.id}
              className={`bg-white rounded-xl border p-5 shadow-gov transition-all ${
                isResolved ? 'border-slate-200 bg-slate-50/50' : 'border-amber-300 ring-1 ring-amber-400/20'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-start space-x-3">
                  <div className={`p-2.5 rounded-xl shrink-0 ${isResolved ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-800'}`}>
                    <CopyCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold font-mono text-slate-500">{pair.id}</span>
                      <span className="text-sm font-bold text-slate-900">
                        Survey {pair.recordA.surveyNumber} • {pair.recordA.village}, {pair.recordA.district}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                        {pair.similarityScore}% AI Similarity
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Detected: {pair.detectedAt} • Investigating: {pair.investigatingOfficer || 'Revenue Officer'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    pair.status === 'Merged'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : pair.status === 'Marked Different'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {pair.status}
                  </span>

                  <button
                    onClick={() => handleOpenComparison(pair)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    View Comparison & Resolve
                  </button>
                </div>
              </div>

              {/* Conflict Reasons */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-blue-900 block mb-1">Record A: {pair.recordA.recordId}</span>
                  <p className="text-slate-800 font-semibold">{pair.recordA.ownerName} (S/o {pair.recordA.fatherName})</p>
                  <p className="text-slate-600">Area: {pair.recordA.landArea} Acres • Mutation: {pair.recordA.mutationNumber}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-blue-900 block mb-1">Record B: {pair.recordB.recordId}</span>
                  <p className="text-slate-800 font-semibold">{pair.recordB.ownerName} (S/o {pair.recordB.fatherName})</p>
                  <p className="text-slate-600">Area: {pair.recordB.landArea} Acres • Mutation: {pair.recordB.mutationNumber}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Duplicate Comparison Modal */}
      <DuplicateComparisonModal
        pair={selectedPair}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onResolve={resolveDuplicatePair}
      />
    </div>
  );
};
