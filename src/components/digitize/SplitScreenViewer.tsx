import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  ShieldCheck, 
  Send, 
  Languages, 
  FileEdit, 
  Check, 
  Undo2,
  HelpCircle
} from 'lucide-react';
import { LandRecord } from '../../types';
import { DocumentCanvas } from './DocumentCanvas';
import { SamplePresetDocument } from '../../data/sampleDocuments';
import { StatusBadge } from '../common/StatusBadge';

interface SplitScreenViewerProps {
  documentPreset: SamplePresetDocument;
  onSaveDraft: (fields: any) => void;
  onValidate: (fields: any) => void;
  onSendForVerification: (fields: any) => void;
}

export const SplitScreenViewer: React.FC<SplitScreenViewerProps> = ({
  documentPreset,
  onSaveDraft,
  onValidate,
  onSendForVerification
}) => {
  const [formData, setFormData] = useState({ ...documentPreset.extractedFields });
  const [viewLanguageMode, setViewLanguageMode] = useState<'english' | 'regional'>('english');
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [editedFields, setEditedFields] = useState<Record<string, boolean>>({});

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setEditedFields(prev => ({ ...prev, [key]: true }));
  };

  const getConfidenceBadge = (fieldKey: string) => {
    const score = documentPreset.confidenceScores[fieldKey] ?? 95;
    let color = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score < 85) color = 'bg-rose-50 text-rose-700 border-rose-200';
    else if (score < 92) color = 'bg-amber-50 text-amber-700 border-amber-200';

    return (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${color}`}
        title={`AI OCR confidence score for ${fieldKey}`}
      >
        <Sparkles className="w-3 h-3" />
        {score}%
      </span>
    );
  };

  const regional = documentPreset.regionalOriginalText || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: Scanned Land Document Preview */}
      <div className="lg:col-span-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Original Scanned Document Preview
            </h4>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Language: <span className="text-blue-700 font-semibold">{documentPreset.language}</span>
          </span>
        </div>

        <DocumentCanvas
          svgContent={documentPreset.previewSvg}
          documentTitle={documentPreset.title}
          totalPages={documentPreset.pages}
          activeFieldHover={hoveredField}
        />
      </div>

      {/* RIGHT COLUMN: AI Extracted Fields */}
      <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-gov p-5 flex flex-col space-y-5">
        {/* Header & Translation Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">
                AI Extracted Land Record Fields
              </h4>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and correct extracted values before government registration.
            </p>
          </div>

          {/* Translation Option: Original vs English */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
            <button
              onClick={() => setViewLanguageMode('english')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                viewLanguageMode === 'english'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English Translation
            </button>
            <button
              onClick={() => setViewLanguageMode('regional')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                viewLanguageMode === 'regional'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Original ({documentPreset.language.split(' ')[0]})
            </button>
          </div>
        </div>

        {/* Demo Scenario Alert Banner */}
        {documentPreset.isMismatchDemo && (
          <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-amber-900">
                AI Anomaly Alert: Land Area Inconsistency Detected
              </p>
              <p className="text-amber-800 mt-0.5">
                Digitized document states <span className="font-bold underline">2.45 Acres</span>, whereas existing Government Cadastral database records indicate <span className="font-bold">2.51 Acres</span> (Confidence: 82%).
              </p>
            </div>
          </div>
        )}

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
          {/* 1. Owner Name */}
          <div
            onMouseEnter={() => setHoveredField('ownerName')}
            onMouseLeave={() => setHoveredField(null)}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Owner Name</label>
              {getConfidenceBadge('ownerName')}
            </div>
            <input
              type="text"
              value={viewLanguageMode === 'regional' && regional.ownerName ? regional.ownerName : formData.ownerName}
              onChange={(e) => handleChange('ownerName', e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* 2. Father / Guardian Name */}
          <div
            onMouseEnter={() => setHoveredField('fatherName')}
            onMouseLeave={() => setHoveredField(null)}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Father / Guardian Name</label>
              {getConfidenceBadge('fatherName')}
            </div>
            <input
              type="text"
              value={formData.fatherName}
              onChange={(e) => handleChange('fatherName', e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* 3. Survey Number */}
          <div
            onMouseEnter={() => setHoveredField('surveyNumber')}
            onMouseLeave={() => setHoveredField(null)}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Survey Number</label>
              {getConfidenceBadge('surveyNumber')}
            </div>
            <input
              type="text"
              value={viewLanguageMode === 'regional' && regional.surveyNumber ? regional.surveyNumber : formData.surveyNumber}
              onChange={(e) => handleChange('surveyNumber', e.target.value)}
              className="w-full text-xs px-3 py-2 bg-blue-50/50 border border-blue-200 rounded-lg font-bold text-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* 4. Khata Number */}
          <div
            onMouseEnter={() => setHoveredField('khataNumber')}
            onMouseLeave={() => setHoveredField(null)}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Khata Number</label>
              {getConfidenceBadge('khataNumber')}
            </div>
            <input
              type="text"
              value={formData.khataNumber}
              onChange={(e) => handleChange('khataNumber', e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* 5. Village */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Village</label>
              {getConfidenceBadge('village')}
            </div>
            <input
              type="text"
              value={viewLanguageMode === 'regional' && regional.village ? regional.village : formData.village}
              onChange={(e) => handleChange('village', e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* 6. Taluk */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Taluk</label>
              {getConfidenceBadge('taluk')}
            </div>
            <input
              type="text"
              value={viewLanguageMode === 'regional' && regional.taluk ? regional.taluk : formData.taluk}
              onChange={(e) => handleChange('taluk', e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* 7. District & State */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">District & State</label>
              {getConfidenceBadge('district')}
            </div>
            <input
              type="text"
              value={`${formData.district}, ${formData.state}`}
              disabled
              className="w-full text-xs px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg font-medium text-slate-600 cursor-not-allowed"
            />
          </div>

          {/* 8. Land Area (Highlighted for Mismatch) */}
          <div
            onMouseEnter={() => setHoveredField('landArea')}
            onMouseLeave={() => setHoveredField(null)}
            className="space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Land Area (Acres)</label>
              {getConfidenceBadge('landArea')}
            </div>
            <input
              type="number"
              step="0.01"
              value={formData.landArea}
              onChange={(e) => handleChange('landArea', parseFloat(e.target.value) || 0)}
              className={`w-full text-xs px-3 py-2 border rounded-lg font-bold focus:ring-2 focus:outline-hidden ${
                documentPreset.isMismatchDemo
                  ? 'bg-rose-50/60 border-rose-300 text-rose-900 focus:ring-rose-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-blue-500'
              }`}
            />
          </div>

          {/* 9. Land Type */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Land Type</label>
              {getConfidenceBadge('landType')}
            </div>
            <select
              value={formData.landType}
              onChange={(e) => handleChange('landType', e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="Agricultural">Agricultural (ಖುಷ್ಕಿ / ತರಿ)</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Forest / Wasteland">Forest / Wasteland</option>
            </select>
          </div>

          {/* 10. Ownership Type */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Ownership Type</label>
              {getConfidenceBadge('ownershipType')}
            </div>
            <select
              value={formData.ownershipType}
              onChange={(e) => handleChange('ownershipType', e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="Individual">Individual (ಖಾಸಗಿ)</option>
              <option value="Joint / Co-owners">Joint / Co-owners</option>
              <option value="Ancestral / Coparcenary">Ancestral / Coparcenary</option>
              <option value="Trust / Institutional">Trust / Institutional</option>
              <option value="Government Leased">Government Leased</option>
            </select>
          </div>

          {/* 11. Registration Date */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Registration Date</label>
              {getConfidenceBadge('registrationDate')}
            </div>
            <input
              type="date"
              value={formData.registrationDate}
              onChange={(e) => handleChange('registrationDate', e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* 12. Mutation Number */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Mutation Number</label>
              {getConfidenceBadge('mutationNumber')}
            </div>
            <input
              type="text"
              value={formData.mutationNumber}
              onChange={(e) => handleChange('mutationNumber', e.target.value)}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* 13. GPS Coordinates */}
          <div className="space-y-1.5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">DGPS Cadastral Centroid (Lat, Long)</label>
              {getConfidenceBadge('latitude')}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                step="0.0001"
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', parseFloat(e.target.value) || 0)}
                placeholder="Latitude"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
              <input
                type="number"
                step="0.0001"
                value={formData.longitude}
                onChange={(e) => handleChange('longitude', parseFloat(e.target.value) || 0)}
                placeholder="Longitude"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onSaveDraft(formData)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Save Draft</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onValidate(formData)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-colors shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Validate Record</span>
            </button>

            <button
              type="button"
              onClick={() => onSendForVerification(formData)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Send for Verification</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
