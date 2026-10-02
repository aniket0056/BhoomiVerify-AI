import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, Sparkles, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { ValidationResult, RiskLevel } from '../../types';

interface ValidationScoreCardProps {
  result: ValidationResult;
}

export const ValidationScoreCard: React.FC<ValidationScoreCardProps> = ({ result }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 stroke-emerald-500';
    if (score >= 75) return 'text-amber-600 stroke-amber-500';
    return 'text-rose-600 stroke-rose-500';
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">CRITICAL RISK</span>;
      case 'HIGH':
        return <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">HIGH RISK</span>;
      case 'MEDIUM':
        return <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">MEDIUM RISK</span>;
      case 'LOW':
      default:
        return <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">LOW RISK (PASSED)</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        {/* Left Score Circle */}
        <div className="flex items-center space-x-5">
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 stroke-current"
                strokeWidth="3.5"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${getScoreColor(result.overallScore)} transition-all duration-1000 ease-out`}
                strokeDasharray={`${result.overallScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900 leading-none">{result.overallScore}%</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">Confidence</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                AI Validation & Integrity Score
              </h3>
              {getRiskBadge(result.riskLevel)}
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Cross-checked across State Revenue Database, Village Cadastral Tippani, Sub-Registrar Microfilm, and DGPS Satellite Polygon.
            </p>
          </div>
        </div>

        {/* Quick Check Highlights */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-center">
            <span className="text-[10px] text-slate-500 block font-semibold">CHECKS RUN</span>
            <span className="text-sm font-bold text-slate-800">{result.checks.length} Parameters</span>
          </div>
          <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-center">
            <span className="text-[10px] text-slate-500 block font-semibold">MATCHED</span>
            <span className="text-sm font-bold text-emerald-600">
              {result.checks.filter(c => c.status === 'MATCHED').length}
            </span>
          </div>
          <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-center">
            <span className="text-[10px] text-slate-500 block font-semibold">MISMATCH / PARTIAL</span>
            <span className="text-sm font-bold text-rose-600">
              {result.checks.filter(c => c.status !== 'MATCHED').length}
            </span>
          </div>
        </div>
      </div>

      {/* 8 Status Indicator Tags */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {[
          { label: 'Owner Name', status: result.ownerMatch },
          { label: 'Survey Number', status: result.surveyMatch },
          { label: 'Land Area', status: result.areaMatch },
          { label: 'Village Code', status: result.villageMatch },
          { label: 'Mutation Reg.', status: result.mutationMatch },
          { label: 'Historical Record', status: result.historicalRecordMatch },
          { label: 'GIS Boundary', status: result.gisMatch },
          { label: 'Registration', status: 'MATCHED' },
        ].map((item) => {
          const isMatched = item.status === 'MATCHED';
          const isPartial = item.status === 'PARTIAL MATCH';

          return (
            <div
              key={item.label}
              className={`p-2.5 rounded-lg border text-center ${
                isMatched
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                  : isPartial
                  ? 'bg-amber-50/50 border-amber-200 text-amber-900'
                  : 'bg-rose-50/50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                {isMatched ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isPartial ? (
                  <Clock className="w-4 h-4 text-amber-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600" />
                )}
              </div>
              <span className="text-[10px] font-bold text-slate-700 block truncate">{item.label}</span>
              <span className={`text-[9px] font-extrabold uppercase ${isMatched ? 'text-emerald-700' : isPartial ? 'text-amber-700' : 'text-rose-700'}`}>
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
