import React from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  FileText, 
  Languages, 
  Database, 
  ShieldCheck, 
  Layers, 
  Cpu 
} from 'lucide-react';

interface PipelineProgressProps {
  currentStageIndex: number;
  stages: string[];
  metrics?: {
    ocrAccuracy: number;
    extractedFieldsCount: number;
    detectedLanguage: string;
    potentialMismatches: number;
    overallConfidence: number;
    processingTimeSeconds: number;
  } | null;
}

const STAGE_ICONS = [
  FileText,
  Layers,
  Cpu,
  Languages,
  Sparkles,
  Database,
  Database,
  ShieldCheck,
  CheckCircle2,
];

export const PipelineProgress: React.FC<PipelineProgressProps> = ({
  currentStageIndex,
  stages,
  metrics
}) => {
  const isCompleted = currentStageIndex >= stages.length - 1;

  return (
    <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Animated Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-500 animate-pulse"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
            <h3 className="text-base font-bold text-white tracking-tight">
              BhoomiVerify Neural OCR & Validation Pipeline
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Multilingual Vision Transformer (ViT) & Cadastral Graph Database Matching
          </p>
        </div>

        {metrics && (
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs">
              <span className="text-slate-400 block text-[10px]">OCR Accuracy</span>
              <span className="font-bold text-emerald-400">{metrics.ocrAccuracy}%</span>
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs">
              <span className="text-slate-400 block text-[10px]">Extracted Fields</span>
              <span className="font-bold text-blue-400">{metrics.extractedFieldsCount} Fields</span>
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs">
              <span className="text-slate-400 block text-[10px]">Detected Language</span>
              <span className="font-bold text-sky-300">{metrics.detectedLanguage}</span>
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs">
              <span className="text-slate-400 block text-[10px]">AI Confidence</span>
              <span className={`font-bold ${metrics.overallConfidence < 85 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {metrics.overallConfidence}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 9 Stages Horizontal Stepper */}
      <div className="relative">
        {/* Progress line */}
        <div className="hidden lg:block absolute top-5 left-6 right-6 h-0.5 bg-slate-800 -z-0">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${(Math.min(currentStageIndex, stages.length - 1) / (stages.length - 1)) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-3 relative z-10">
          {stages.map((stageName, idx) => {
            const Icon = STAGE_ICONS[idx % STAGE_ICONS.length];
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isPending = idx > currentStageIndex;

            return (
              <div
                key={stageName}
                className={`p-3 rounded-lg border transition-all duration-300 flex flex-col items-center text-center ${
                  isCurrent
                    ? 'bg-blue-950/80 border-blue-500/80 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500'
                    : isDone
                    ? 'bg-slate-800/60 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-900/40 border-slate-800 text-slate-500'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white animate-pulse'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>

                <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 0{idx + 1}</span>
                <span className={`text-[11px] font-semibold mt-0.5 leading-tight ${isCurrent ? 'text-white' : isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                  {stageName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
