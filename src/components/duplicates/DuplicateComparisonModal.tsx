import React, { useState } from 'react';
import { 
  CopyCheck, 
  ArrowLeftRight, 
  Check, 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  Scale, 
  GitMerge,
  Split,
  Search
} from 'lucide-react';
import { DuplicateRecordPair } from '../../types';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';

interface DuplicateComparisonModalProps {
  pair: DuplicateRecordPair | null;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (pairId: string, resolution: DuplicateRecordPair['status']) => void;
}

export const DuplicateComparisonModal: React.FC<DuplicateComparisonModalProps> = ({
  pair,
  isOpen,
  onClose,
  onResolve
}) => {
  const [resolutionNotes, setResolutionNotes] = useState('');

  if (!pair) return null;

  const { recordA, recordB, similarityScore, conflictReasons } = pair;

  const handleAction = (resolution: DuplicateRecordPair['status']) => {
    onResolve(pair.id, resolution);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Duplicate & Conflict Resolution: Survey ${recordA.surveyNumber}`}
      subtitle={`AI Similarity Index: ${similarityScore}% • Status: ${pair.status}`}
      maxWidth="5xl"
    >
      <div className="space-y-6">
        {/* Similarity & Conflict Header */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-bold text-amber-950">
                  Potential Dual Registration Detected
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold">
                  {similarityScore}% Match
                </span>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-amber-900 list-disc pl-4 font-medium">
                {conflictReasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Side-by-Side Record Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Record A */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-blue-900">Record A: {recordA.recordId}</span>
              <StatusBadge status={recordA.status} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Owner Name:</span> <span className="font-bold text-slate-800">{recordA.ownerName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Father Name:</span> <span className="text-slate-800">{recordA.fatherName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Survey No:</span> <span className="font-bold text-blue-700">{recordA.surveyNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Khata No:</span> <span className="text-slate-800">{recordA.khataNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Village & District:</span> <span className="text-slate-800">{recordA.village}, {recordA.district}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Land Area:</span> <span className="font-bold text-slate-900">{recordA.landArea} Acres</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Mutation Number:</span> <span className="font-mono text-slate-800">{recordA.mutationNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Registration Date:</span> <span className="text-slate-800">{recordA.registrationDate}</span></div>
            </div>
          </div>

          {/* Record B */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-blue-900">Record B: {recordB.recordId}</span>
              <StatusBadge status={recordB.status} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Owner Name:</span> <span className="font-bold text-slate-800">{recordB.ownerName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Father Name:</span> <span className="text-slate-800">{recordB.fatherName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Survey No:</span> <span className="font-bold text-blue-700">{recordB.surveyNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Khata No:</span> <span className="text-slate-800">{recordB.khataNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Village & District:</span> <span className="text-slate-800">{recordB.village}, {recordB.district}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Land Area:</span> <span className="font-bold text-slate-900">{recordB.landArea} Acres</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Mutation Number:</span> <span className="font-mono text-slate-800">{recordB.mutationNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Registration Date:</span> <span className="text-slate-800">{recordB.registrationDate}</span></div>
            </div>
          </div>
        </div>

        {/* Resolution Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-900">Officer Investigation Notes</label>
          <textarea
            rows={2}
            value={resolutionNotes}
            onChange={(e) => setResolutionNotes(e.target.value)}
            placeholder="Record legal findings, sub-division verification, or joint-inheritance clarification..."
            className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => handleAction('Under Investigation')}
            className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Send for Field Survey & Investigation
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('Marked Different')}
              className="px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Split className="w-3.5 h-3.5" />
              <span>Mark Distinct Parcels (Legitimate Partition)</span>
            </button>
            <button
              onClick={() => handleAction('Merged')}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
            >
              <GitMerge className="w-3.5 h-3.5" />
              <span>Merge Records into Single Digital Title</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
