import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  Languages,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { samplePresetDocuments, SamplePresetDocument } from '../../data/sampleDocuments';

interface DocumentUploaderProps {
  onSelectDocument: (preset: SamplePresetDocument) => void;
  onStartProcessing: () => void;
  selectedPreset: SamplePresetDocument;
  isProcessing: boolean;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onSelectDocument,
  onStartProcessing,
  selectedPreset,
  isProcessing
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [customFileName, setCustomFileName] = useState<string | null>(null);

  const handleCustomFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomFileName(file.name);
      // Associate with primary preset
      onSelectDocument({
        ...samplePresetDocuments[0],
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sample Government Document Presets Selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Select Official Land Record Template (Instant Demo Presets)
            </h4>
            <p className="text-xs text-slate-500">
              Choose from authentic multi-state land records or upload your own scanned registry.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Ready</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {samplePresetDocuments.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  setCustomFileName(null);
                  onSelectDocument(preset);
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                      {preset.state}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 leading-snug">{preset.title}</h5>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{preset.scenarioDescription}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-medium text-slate-700">{preset.language}</span>
                  <span>{preset.fileSize}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Drag & Drop Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const file = e.dataTransfer.files[0];
                setCustomFileName(file.name);
                onSelectDocument({
                  ...samplePresetDocuments[0],
                  fileName: file.name,
                  fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                });
              }
            }}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all bg-white shadow-gov flex flex-col items-center justify-center min-h-[260px] ${
              isDragOver ? 'border-blue-500 bg-blue-50/40 scale-[1.01]' : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Drag & Drop Scanned Land Documents
            </h3>
            <p className="text-xs text-slate-500 max-w-md mt-1 mb-4">
              Supported formats: <span className="font-semibold text-slate-700">PDF, JPEG, PNG, TIFF, Multi-page TIF</span> (Max size: 50MB per deed).
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors">
                <FileText className="w-4 h-4" />
                <span>Browse Files</span>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.tiff"
                  onChange={handleCustomFile}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  alert('Direct Scanner / DGPS Camera Interface simulated. Document loaded.');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
              >
                <Camera className="w-4 h-4 text-slate-500" />
                <span>Capture / Live Scanner</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Selected File Summary & AI Launch Action */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-gov flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900">Active Document Queue</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Ready to Process
              </span>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {customFileName || selectedPreset.fileName}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {selectedPreset.docType} • {selectedPreset.fileSize}
                  </p>
                  <div className="mt-2 flex items-center space-x-2 text-[10px] text-slate-600 font-medium">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                      {selectedPreset.language}
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                      {selectedPreset.pages} Page(s)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Jurisdiction District:</span>
                <span className="font-semibold text-slate-800">{selectedPreset.district}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">OCR Engine Mode:</span>
                <span className="font-semibold text-blue-700">Multilingual Indic Vision</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Cadastral Cross-check:</span>
                <span className="font-semibold text-emerald-600">DILRMP Live Linked</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={onStartProcessing}
              disabled={isProcessing}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isProcessing ? 'Processing AI Pipeline...' : 'Process Document with AI'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
