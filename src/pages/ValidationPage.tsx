import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Filter, 
  FileCheck2, 
  CheckCircle2, 
  RotateCcw,
  ArrowRight,
  Database
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ValidationScoreCard } from '../components/validation/ValidationScoreCard';
import { ComparisonTable } from '../components/validation/ComparisonTable';
import { AnomalyAlerts } from '../components/validation/AnomalyAlerts';
import { AIEngine } from '../services/aiEngine';
import { LandRecord } from '../types';

export const ValidationPage: React.FC = () => {
  const { 
    records, 
    selectedRecordForValidation, 
    setSelectedRecordForValidation,
    setSelectedRecordForReview,
    setActiveTab,
    selectedDistrict 
  } = useApp();

  const filteredRecords = selectedDistrict === 'All Districts'
    ? records
    : records.filter(r => r.district.toLowerCase() === selectedDistrict.toLowerCase());

  // Default to Ramesh Kumar demo record (LR-2026-58421) if none selected
  const activeRecord = selectedRecordForValidation 
    || records.find(r => r.recordId === 'LR-2026-58421') 
    || records[0];

  const validationResult = AIEngine.validateRecord(activeRecord);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
              Cadastral Integrity Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Real-Time Cross-Verification
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            AI Land Record Validation Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated multi-source validation comparing digitized deeds against State Registries, Microfilms, and Cadastral GIS.
          </p>
        </div>

        {/* Quick Record Switcher Dropdown */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-600 shrink-0">Select Target Parcel:</label>
          <select
            value={activeRecord.recordId}
            onChange={(e) => {
              const found = records.find(r => r.recordId === e.target.value);
              if (found) setSelectedRecordForValidation(found);
            }}
            className="text-xs font-semibold px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          >
            {filteredRecords.map(r => (
              <option key={r.recordId} value={r.recordId}>
                {r.surveyNumber} - {r.ownerName} ({r.village}, {r.district}) {r.riskLevel !== 'LOW' ? '⚠️' : '✓'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Record Header Strip */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-gov flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
            SY
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold text-slate-900">Survey No: {activeRecord.surveyNumber}</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-bold font-mono">
                {activeRecord.recordId}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Owner: <strong className="text-slate-800">{activeRecord.ownerName}</strong> • Village: {activeRecord.village}, {activeRecord.district} • Land: {activeRecord.landArea} Acres
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedRecordForReview(activeRecord);
              setActiveTab('verification');
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Open Officer Review Queue</span>
          </button>
        </div>
      </div>

      {/* 1. Overall Validation Score Card */}
      <ValidationScoreCard result={validationResult} />

      {/* 2. AI Anomaly & Fraud Risk Detection Alerts */}
      <AnomalyAlerts
        riskLevel={validationResult.riskLevel}
        anomalies={validationResult.anomalies}
        recommendation={validationResult.aiRecommendation}
        onReview={() => {
          setSelectedRecordForReview(activeRecord);
          setActiveTab('verification');
        }}
        onEscalate={() => {
          alert(`Record ${activeRecord.recordId} escalated to District Collector & Magistrate.`);
        }}
      />

      {/* 3. Side-by-Side Comparison Table */}
      <ComparisonTable checks={validationResult.checks} />
    </div>
  );
};
