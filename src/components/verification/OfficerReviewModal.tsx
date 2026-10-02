import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Send, 
  FileText, 
  MapPin, 
  Database, 
  Sparkles, 
  ShieldAlert,
  History,
  Check,
  UserCheck
} from 'lucide-react';
import { LandRecord, RecordStatus } from '../../types';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { samplePresetDocuments } from '../../data/sampleDocuments';
import { DocumentCanvas } from '../digitize/DocumentCanvas';

interface OfficerReviewModalProps {
  record: LandRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitDecision: (recordId: string, status: RecordStatus, remarks: string) => void;
}

export const OfficerReviewModal: React.FC<OfficerReviewModalProps> = ({
  record,
  isOpen,
  onClose,
  onSubmitDecision,
}) => {
  const [remarks, setRemarks] = useState('');
  const [activeTab, setActiveTab] = useState<'comparison' | 'document' | 'history'>('comparison');

  if (!record) return null;

  // Find sample document svg preview if matched, or default
  const preset = samplePresetDocuments.find(p => p.extractedFields.surveyNumber === record.surveyNumber) || samplePresetDocuments[0];

  const handleAction = (status: RecordStatus) => {
    if (!remarks.trim()) {
      alert('Please provide mandatory Officer Remarks before submitting your decision.');
      return;
    }
    onSubmitDecision(record.recordId, status, remarks);
    setRemarks('');
    onClose();
  };

  const govt = record.existingGovtData || {
    ownerName: record.ownerName,
    fatherName: record.fatherName,
    surveyNumber: record.surveyNumber,
    khataNumber: record.khataNumber,
    landArea: record.landArea,
    village: record.village,
    taluk: record.taluk,
    mutationNumber: record.mutationNumber
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Officer Verification & Audit Review: Survey ${record.surveyNumber}`}
      subtitle={`Record ID: ${record.recordId} • Village: ${record.village}, ${record.district} • Status: ${record.status}`}
      maxWidth="5xl"
    >
      <div className="space-y-5">
        {/* Top Tab Switcher */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'comparison'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Extracted vs. Govt DB Comparison
            </button>
            <button
              onClick={() => setActiveTab('document')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'document'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Original Scanned Deed
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Cadastral Timeline
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <StatusBadge status={record.status} />
            <StatusBadge riskLevel={record.riskLevel} />
          </div>
        </div>

        {/* Tab 1: Comparison & Anomaly Alerts */}
        {activeTab === 'comparison' && (
          <div className="space-y-4">
            {/* Primary Mismatch Warning */}
            {record.riskLevel !== 'LOW' && (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-amber-950">AI Discrepancy & Verification Summary:</p>
                  <p className="text-amber-800 mt-1">
                    {record.officerRemarks || 'Document area / sub-division requires officer physical signature validation against Taluk survey atlas.'}
                  </p>
                </div>
              </div>
            )}

            {/* Comparison Grid */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-200/70 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Attribute</th>
                    <th className="px-4 py-3 text-blue-900">Digitized Record</th>
                    <th className="px-4 py-3 text-slate-900">Government Database</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-2.5 font-bold text-slate-700">Owner Name</td>
                    <td className="px-4 py-2.5 font-medium text-slate-900">{record.ownerName}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-900">{govt.ownerName}</td>
                    <td className="px-4 py-2.5 text-center font-bold text-emerald-600">MATCHED</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-bold text-slate-700">Survey Number</td>
                    <td className="px-4 py-2.5 font-bold text-blue-700">{record.surveyNumber}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-800">{govt.surveyNumber}</td>
                    <td className="px-4 py-2.5 text-center font-bold text-emerald-600">MATCHED</td>
                  </tr>
                  <tr className={record.landArea !== govt.landArea ? 'bg-rose-100/60 font-semibold' : ''}>
                    <td className="px-4 py-2.5 font-bold text-slate-700">Land Area</td>
                    <td className="px-4 py-2.5 font-bold text-rose-900">{record.landArea} Acres</td>
                    <td className="px-4 py-2.5 font-bold text-slate-900">{govt.landArea} Acres</td>
                    <td className="px-4 py-2.5 text-center">
                      {record.landArea === govt.landArea ? (
                        <span className="font-bold text-emerald-600">MATCHED</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-800 font-bold text-[10px]">
                          MISMATCH (-0.06 Ac)
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-bold text-slate-700">Village & Taluk</td>
                    <td className="px-4 py-2.5">{record.village}, {record.taluk}</td>
                    <td className="px-4 py-2.5">{govt.village}, {govt.taluk}</td>
                    <td className="px-4 py-2.5 text-center font-bold text-emerald-600">MATCHED</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-bold text-slate-700">Mutation Number</td>
                    <td className="px-4 py-2.5 font-mono">{record.mutationNumber}</td>
                    <td className="px-4 py-2.5 font-mono">{govt.mutationNumber}</td>
                    <td className="px-4 py-2.5 text-center font-bold text-emerald-600">MATCHED</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-bold text-slate-700">Cadastral Centroid</td>
                    <td className="px-4 py-2.5 font-mono">{record.latitude.toFixed(4)} N, {record.longitude.toFixed(4)} E</td>
                    <td className="px-4 py-2.5 font-mono">{record.latitude.toFixed(4)} N, {record.longitude.toFixed(4)} E</td>
                    <td className="px-4 py-2.5 text-center font-bold text-emerald-600">GIS 96% MATCH</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Document */}
        {activeTab === 'document' && (
          <div className="h-[420px]">
            <DocumentCanvas
              svgContent={preset.previewSvg}
              documentTitle={preset.title}
              totalPages={preset.pages}
            />
          </div>
        )}

        {/* Tab 3: Timeline */}
        {activeTab === 'history' && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Cadastral & Ownership Timeline
            </h5>
            <div className="border-l-2 border-blue-500 pl-4 space-y-4 ml-2 my-2 text-xs">
              <div>
                <span className="text-[10px] font-bold text-blue-700 block">14-JUL-1998</span>
                <p className="font-bold text-slate-800">Acquired via Registered Sale Deed</p>
                <p className="text-slate-600">Registered by Ramesh Kumar under deed MR-1998-2837 (2.45 Acres).</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-700 block">20-AUG-2008</span>
                <p className="font-bold text-slate-800">Mutation Register Updated</p>
                <p className="text-slate-600">Bhoomi computerized ledger migration entry completed.</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-700 block">15-NOV-2015</span>
                <p className="font-bold text-slate-800">DGPS Boundary Survey Completed</p>
                <p className="text-slate-600">Karnataka Cadastral DGPS pillar markers established.</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-700 block">02-OCT-2026 (Today)</span>
                <p className="font-bold text-blue-900">AI Digitization & Validation Completed</p>
                <p className="text-slate-600">Neural OCR scanned RTC with 97.2% accuracy. Inconsistency flagged.</p>
              </div>
            </div>
          </div>
        )}

        {/* Officer Remarks Form */}
        <div className="space-y-1.5 pt-2 border-t border-slate-200">
          <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>Officer Verification Remarks <span className="text-rose-500">*</span></span>
            <span className="text-[11px] font-normal text-slate-500">Immutable Audit Record</span>
          </label>
          <textarea
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter official observation, boundary survey resolution notes, or justification for approval/rejection..."
            className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Decision Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleAction('Review Required')}
              className="px-3.5 py-2 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors shadow-xs"
            >
              Request Field Correction
            </button>
            <button
              type="button"
              onClick={() => handleAction('Disputed')}
              className="px-3.5 py-2 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-900 text-xs font-bold transition-colors shadow-xs"
            >
              Escalate to District Authority
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleAction('Rejected')}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
            >
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Reject Record</span>
            </button>
            <button
              type="button"
              onClick={() => handleAction('Verified')}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Approve & Verify Record</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
