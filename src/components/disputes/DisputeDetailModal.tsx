import React, { useState } from 'react';
import { 
  Scale, 
  Gavel, 
  Calendar, 
  FileText, 
  User, 
  CheckCircle2, 
  Clock, 
  UploadCloud, 
  ShieldAlert,
  MapPin,
  Send
} from 'lucide-react';
import { DisputeRecord } from '../../types';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';

interface DisputeDetailModalProps {
  dispute: DisputeRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (disputeId: string, status: DisputeRecord['status']) => void;
}

export const DisputeDetailModal: React.FC<DisputeDetailModalProps> = ({
  dispute,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
  const [selectedStatus, setSelectedStatus] = useState<DisputeRecord['status']>(dispute?.status || 'Active');
  const [hearingNotes, setHearingNotes] = useState('');

  if (!dispute) return null;

  const handleSave = () => {
    onUpdateStatus(dispute.disputeId, selectedStatus);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Dispute Case File: ${dispute.disputeId}`}
      subtitle={`Survey ${dispute.surveyNumber} • ${dispute.village}, ${dispute.district}`}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Case Header Banner */}
        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-lg bg-purple-100 text-purple-700 shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-bold text-purple-950">{dispute.disputeType}</h4>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                  {dispute.priority} Priority
                </span>
              </div>
              <p className="text-xs text-purple-900 mt-1 font-medium">
                {dispute.courtCaseNumber || 'Revenue Sub-Divisional Officer Summary Hearing'}
              </p>
            </div>
          </div>

          <StatusBadge status={dispute.status} />
        </div>

        {/* Parties Involved */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Claimant (Petitioner)</span>
            <p className="font-bold text-slate-900 text-sm">{dispute.claimant}</p>
            <p className="text-slate-500">Asserting co-parcenary partition rights</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Respondent (Title Holder)</span>
            <p className="font-bold text-slate-900 text-sm">{dispute.respondent}</p>
            <p className="text-slate-500">Registered owner per 1998 sale deed</p>
          </div>
        </div>

        {/* Case Description */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
          <span className="font-bold text-slate-900">Litigation Details & Grounds</span>
          <p className="text-slate-700 leading-relaxed">{dispute.description}</p>
        </div>

        {/* Status Update & Hearing Notes */}
        <div className="space-y-4 pt-2 border-t border-slate-200 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-900 block mb-1">Update Case Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active Case</option>
                <option value="In Hearing">In Hearing / Sub-Judice</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Resolved">Resolved & Order Passed</option>
                <option value="Dismissed">Dismissed</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">Assigned Revenue Officer</label>
              <input
                type="text"
                disabled
                value={dispute.assignedOfficer}
                className="w-full text-xs p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-900 block mb-1">Hearing Endorsement / Order Remarks</label>
            <textarea
              rows={2}
              value={hearingNotes}
              onChange={(e) => setHearingNotes(e.target.value)}
              placeholder="Record court proceeding notes, compromise deed verification, or next hearing date..."
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => alert('Evidence upload simulated. 1 new evidentiary deed attached to case file.')}
            className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Attach Evidence ({dispute.evidenceDocumentsCount} attached)</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            Save Case Update
          </button>
        </div>
      </div>
    </Modal>
  );
};
