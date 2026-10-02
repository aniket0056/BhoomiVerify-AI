import React, { useState } from 'react';
import { 
  Settings, 
  Sparkles, 
  Sliders, 
  Languages, 
  ShieldCheck, 
  Database, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  Bell,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { resetAllData } = useApp();

  const [ocrThreshold, setOcrThreshold] = useState(85);
  const [areaToleranceGuntas, setAreaToleranceGuntas] = useState(2);
  const [duplicateSimilarity, setDuplicateSimilarity] = useState(90);
  const [gisOverlapThreshold, setGisOverlapThreshold] = useState(5);
  const [autoEscalateDays, setAutoEscalateDays] = useState(14);
  const [indicLanguageEngine, setIndicLanguageEngine] = useState('vits-indic-transformer-v3');
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Reset entire prototype database back to initial pristine government demo dataset?')) {
      resetAllData();
      alert('All land records, audit logs, and disputes have been restored to initial sample state.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
              System Configuration
            </span>
            <span className="text-xs text-slate-500 font-medium">
              National Engine Parameters
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            AI Engine Thresholds & Workflow Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tune neural OCR sensitivity, cadastral discrepancy tolerances, indicative language models, and automated SLA escalation triggers.
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Reset to Pristine Demo Data</span>
        </button>
      </div>

      {/* Save Alert */}
      {savedAlert && (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>System configurations successfully updated and synchronized across all active Revenue Nodes.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Box 1: AI & OCR Thresholds */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                AI Validation & Confidence Thresholds
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-700">Minimum OCR Acceptance Threshold</label>
                  <span className="font-mono font-bold text-blue-700">{ocrThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="98"
                  value={ocrThreshold}
                  onChange={(e) => setOcrThreshold(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <p className="text-[10px] text-slate-400 mt-1">Deeds below this confidence level require mandatory dual officer physical verification.</p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-700">Land Area Mismatch Tolerance</label>
                  <span className="font-mono font-bold text-blue-700">±{areaToleranceGuntas} Guntas (0.05 Ac)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={areaToleranceGuntas}
                  onChange={(e) => setAreaToleranceGuntas(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <p className="text-[10px] text-slate-400 mt-1">Area variance exceeding this tolerance automatically generates high-risk anomaly flags.</p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-700">Duplicate Detection Similarity Trigger</label>
                  <span className="font-mono font-bold text-blue-700">{duplicateSimilarity}%</span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="98"
                  value={duplicateSimilarity}
                  onChange={(e) => setDuplicateSimilarity(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <p className="text-[10px] text-slate-400 mt-1">Spatial and phonetic matching threshold to flag potential dual registration fraud.</p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-700">Cadastral GIS Overlap Alarm Trigger</label>
                  <span className="font-mono font-bold text-blue-700">{gisOverlapThreshold}% Area Overlap</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={gisOverlapThreshold}
                  onChange={(e) => setGisOverlapThreshold(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <p className="text-[10px] text-slate-400 mt-1">Boundary polygon intersection percentage that prompts immediate field surveyor inspection.</p>
              </div>
            </div>
          </div>

          {/* Box 2: Indic OCR & Workflow Settings */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Languages className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Multilingual OCR Engine & Workflow SLA
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Default Indic Vision Transformer (ViT) Model</label>
                <select
                  value={indicLanguageEngine}
                  onChange={(e) => setIndicLanguageEngine(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="vits-indic-transformer-v3">BharatVision-v3 (Optimized for Kannada & Devanagari)</option>
                  <option value="tesseract-indic-deep-v2">Tesseract-Indic-Deep (Pre-1990 Handwritten Deeds)</option>
                  <option value="cadastral-ner-nlp-v4">CadastralNER-Multilingual-v4 (Advanced Entity Parser)</option>
                </select>
                <p className="text-[10px] text-slate-400">High-performance deep learning model trained on over 10M historic Indian land records.</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Verification SLA Deadline</label>
                <select
                  value={autoEscalateDays}
                  onChange={(e) => setAutoEscalateDays(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value={7}>7 Days (Fast Track / Commercial)</option>
                  <option value={14}>14 Days (Standard Government Mandate)</option>
                  <option value={30}>30 Days (Complex Ancestral / Tribal)</option>
                </select>
                <p className="text-[10px] text-slate-400">Records exceeding this duration are automatically escalated to District Magistrate inbox.</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-blue-900 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span>DILRMP Central Sync Gateway</span>
                </div>
                <p className="text-[11px] text-blue-800">
                  Cadastral schema synchronized with Central Digital India Land Record Modernisation Programme standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save & Deploy Configurations</span>
          </button>
        </div>
      </form>
    </div>
  );
};
