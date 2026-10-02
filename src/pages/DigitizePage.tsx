import React, { useState } from 'react';
import { 
  UploadCloud, 
  Sparkles, 
  RotateCcw, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { samplePresetDocuments, SamplePresetDocument } from '../data/sampleDocuments';
import { DocumentUploader } from '../components/digitize/DocumentUploader';
import { PipelineProgress } from '../components/digitize/PipelineProgress';
import { SplitScreenViewer } from '../components/digitize/SplitScreenViewer';
import { AIEngine, AIProcessingMetrics } from '../services/aiEngine';
import { LandRecord } from '../types';

export const DigitizePage: React.FC = () => {
  const { addNewRecord, setActiveTab, setSelectedRecordForValidation, setSelectedRecordForReview } = useApp();
  
  const [selectedPreset, setSelectedPreset] = useState<SamplePresetDocument>(samplePresetDocuments[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [metrics, setMetrics] = useState<AIProcessingMetrics | null>(null);

  const stages = [
    'Document Uploaded',
    'Image Enhancement',
    'OCR Processing',
    'Language Detection',
    'Field Extraction',
    'Entity Identification',
    'Database Matching',
    'Validation',
    'Completed'
  ];

  const handleStartProcessing = async () => {
    setIsProcessing(true);
    setIsProcessed(false);
    setCurrentStageIndex(0);

    const resultMetrics = await AIEngine.processDocumentSimulation(
      {
        fileName: selectedPreset.fileName,
        language: selectedPreset.language,
        isDemoMismatch: selectedPreset.isMismatchDemo
      },
      (idx) => {
        setCurrentStageIndex(idx);
      }
    );

    setMetrics(resultMetrics);
    setIsProcessing(false);
    setIsProcessed(true);
  };

  const handleReset = () => {
    setIsProcessed(false);
    setIsProcessing(false);
    setCurrentStageIndex(0);
    setMetrics(null);
  };

  const createRecordObject = (fields: any): LandRecord => {
    return {
      recordId: `LR-2026-${Math.floor(60000 + Math.random() * 30000)}`,
      surveyNumber: fields.surveyNumber,
      subDivision: fields.subDivision || '1',
      khataNumber: fields.khataNumber,
      ownerName: fields.ownerName,
      fatherName: fields.fatherName,
      village: fields.village,
      taluk: fields.taluk,
      district: fields.district,
      state: fields.state,
      landArea: parseFloat(fields.landArea) || 2.45,
      landAreaFormatted: `${fields.landArea} Acres`,
      landType: fields.landType || 'Agricultural',
      ownershipType: fields.ownershipType || 'Individual',
      registrationDate: fields.registrationDate,
      mutationNumber: fields.mutationNumber,
      marketValuationInr: 4850000,
      latitude: parseFloat(fields.latitude) || 12.1198,
      longitude: parseFloat(fields.longitude) || 76.6832,
      validationScore: selectedPreset.isMismatchDemo ? 82 : 96,
      status: selectedPreset.isMismatchDemo ? 'Review Required' : 'Verified',
      riskLevel: selectedPreset.isMismatchDemo ? 'HIGH' : 'LOW',
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
      detectedLanguage: selectedPreset.language,
      ocrAccuracy: metrics?.ocrAccuracy || 97.2,
      anomaliesDetected: selectedPreset.isMismatchDemo ? [
        `Document area (${fields.landArea} Acres) differs from Government Cadastral database (2.51 Acres).`
      ] : [],
      existingGovtData: {
        ownerName: fields.ownerName,
        fatherName: fields.fatherName,
        surveyNumber: fields.surveyNumber,
        khataNumber: fields.khataNumber,
        landArea: selectedPreset.isMismatchDemo ? 2.51 : parseFloat(fields.landArea),
        village: fields.village,
        taluk: fields.taluk,
        mutationNumber: fields.mutationNumber
      }
    };
  };

  const handleSaveDraft = (fields: any) => {
    const rec = createRecordObject(fields);
    rec.status = 'Draft';
    addNewRecord(rec);
    alert(`Draft record ${rec.recordId} saved to database.`);
    setActiveTab('records');
  };

  const handleValidate = (fields: any) => {
    const rec = createRecordObject(fields);
    addNewRecord(rec);
    setSelectedRecordForValidation(rec);
    setActiveTab('validation');
  };

  const handleSendForVerification = (fields: any) => {
    const rec = createRecordObject(fields);
    rec.status = 'Pending';
    addNewRecord(rec);
    setSelectedRecordForReview(rec);
    setActiveTab('verification');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
              AI Digitization Suite
            </span>
            <span className="text-xs text-slate-500 font-medium">
              OCR Engine: Multilingual Indic Vision Transformer
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Digitize New Land Record
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload legacy scanned documents, patta deeds, or RTC records for automated neural OCR and field extraction.
          </p>
        </div>

        {isProcessed && (
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Digitize Another Record</span>
          </button>
        )}
      </div>

      {/* STEP 1: Uploader View (when not processed) */}
      {!isProcessed && !isProcessing && (
        <DocumentUploader
          onSelectDocument={(preset) => setSelectedPreset(preset)}
          onStartProcessing={handleStartProcessing}
          selectedPreset={selectedPreset}
          isProcessing={isProcessing}
        />
      )}

      {/* STEP 2: Processing Stepper (during pipeline execution) */}
      {isProcessing && (
        <PipelineProgress
          currentStageIndex={currentStageIndex}
          stages={stages}
          metrics={metrics}
        />
      )}

      {/* STEP 3: Split-Screen Extracted View (when completed) */}
      {isProcessed && (
        <div className="space-y-6">
          <PipelineProgress
            currentStageIndex={stages.length - 1}
            stages={stages}
            metrics={metrics}
          />

          <SplitScreenViewer
            documentPreset={selectedPreset}
            onSaveDraft={handleSaveDraft}
            onValidate={handleValidate}
            onSendForVerification={handleSendForVerification}
          />
        </div>
      )}
    </div>
  );
};
