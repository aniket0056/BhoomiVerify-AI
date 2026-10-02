import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExportService } from '../services/exportService';

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  category: 'Digitization' | 'Verification' | 'Compliance' | 'Disputes';
  format: 'PDF / Excel';
  estimatedRecords: number;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'rep-digitization',
    title: 'Monthly Cadastral Digitization Progress Report',
    description: 'Comprehensive breakdown of scanned legacy land deeds, OCR accuracy rates, and language distributions.',
    category: 'Digitization',
    format: 'PDF / Excel',
    estimatedRecords: 98420
  },
  {
    id: 'rep-verification',
    title: 'Officer Verification & Approval Audit Report',
    description: 'Summary of approved, rejected, and flagged land parcels with officer signature credentials.',
    category: 'Verification',
    format: 'PDF / Excel',
    estimatedRecords: 91740
  },
  {
    id: 'rep-pending',
    title: 'Pending Verification Backlog & SLA Escalations',
    description: 'Unverified cadastral records exceeding 14-day SLA deadline across taluks and revenue circles.',
    category: 'Verification',
    format: 'PDF / Excel',
    estimatedRecords: 4285
  },
  {
    id: 'rep-district',
    title: 'District Modernization Performance Scorecard',
    description: 'Comparative performance index covering Bengaluru Rural, Mysuru, Mandya, Tumakuru, and Hassan.',
    category: 'Compliance',
    format: 'PDF / Excel',
    estimatedRecords: 6
  },
  {
    id: 'rep-duplicates',
    title: 'Duplicate Land Record & Conflict Register',
    description: 'Cadastral dual registrations, overlapping polygon coordinates, and merged title certificates.',
    category: 'Compliance',
    format: 'PDF / Excel',
    estimatedRecords: 372
  },
  {
    id: 'rep-disputes',
    title: 'Active Court Litigations & Dispute Report',
    description: 'Senior Civil Court and Sub-Divisional Magistrate dispute files with next hearing calendars.',
    category: 'Disputes',
    format: 'PDF / Excel',
    estimatedRecords: 1147
  }
];

export const ReportsPage: React.FC = () => {
  const { records, auditLogs, selectedDistrict } = useApp();
  const [selectedReport, setSelectedReport] = useState<ReportTemplate>(REPORT_TEMPLATES[0]);
  const [fromDate, setFromDate] = useState('2026-09-01');
  const [toDate, setToDate] = useState('2026-10-02');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReportPreview, setGeneratedReportPreview] = useState<string | null>(null);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReportPreview(
        `Report "${selectedReport.title}" successfully compiled for District: ${selectedDistrict} (Period: ${fromDate} to ${toDate}).`
      );
    }, 400);
  };

  const handleExportCsv = () => {
    if (selectedReport.id === 'rep-audit') {
      ExportService.exportAuditLogsToCsv(auditLogs, `${selectedReport.id}.csv`);
    } else {
      ExportService.exportRecordsToCsv(records, `${selectedReport.id}.csv`);
    }
  };

  const handleExportPdf = () => {
    if (records.length > 0) {
      ExportService.generateOfficialRecordPdf(records[0]);
    } else {
      alert('Generating PDF summary report...');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
              Official Reporting Gateway
            </span>
            <span className="text-xs text-slate-500 font-medium">
              MoRD Standard Compliant
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Government Reports & Analytics Generation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Export official cadastral progress summaries, verification audits, and dispute ledgers in PDF or Excel formats.
          </p>
        </div>
      </div>

      {/* Grid: Templates on Left, Generator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Templates List */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select Official Report Template
          </h3>

          <div className="space-y-2.5">
            {REPORT_TEMPLATES.map((rep) => {
              const isSelected = selectedReport.id === rep.id;
              return (
                <div
                  key={rep.id}
                  onClick={() => {
                    setSelectedReport(rep);
                    setGeneratedReportPreview(null);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-600 shadow-md ring-1 ring-blue-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700">
                      {rep.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      ~{rep.estimatedRecords.toLocaleString('en-IN')} Records
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{rep.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{rep.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Filter & Action Panel */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-gov flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">Report Parameters</span>
              <p className="text-xs text-slate-500 mt-0.5">Selected: <strong className="text-blue-700">{selectedReport.title}</strong></p>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Geographic Scope */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Jurisdiction District:</span>
                <span className="font-bold text-slate-800">{selectedDistrict}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Output Encoding:</span>
                <span className="font-medium text-slate-800">UTF-8 / Unicode Indic</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Watermark:</span>
                <span className="font-medium text-emerald-700">Official MoRD Certified</span>
              </div>
            </div>

            {/* Generated Preview Banner */}
            {generatedReportPreview && (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{generatedReportPreview}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Compiling Dataset...' : 'Generate Official Report'}</span>
            </button>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleExportPdf}
                className="py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>PDF</span>
              </button>
              <button
                onClick={handleExportCsv}
                className="py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Excel</span>
              </button>
              <button
                onClick={() => window.print()}
                className="py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
