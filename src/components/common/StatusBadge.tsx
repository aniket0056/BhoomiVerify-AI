import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { RecordStatus, RiskLevel } from '../../types';

interface StatusBadgeProps {
  status?: RecordStatus | string;
  riskLevel?: RiskLevel;
  confidence?: number;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, riskLevel, confidence, size = 'md' }) => {
  const isSmall = size === 'sm';
  const padding = isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  if (confidence !== undefined) {
    let colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (confidence < 75) colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
    else if (confidence < 90) colorClass = 'bg-amber-50 text-amber-700 border-amber-200';

    return (
      <span className={`inline-flex items-center gap-1 rounded-full border ${colorClass} ${padding}`}>
        <Sparkles className="w-3 h-3" />
        <span>{confidence}% AI Confidence</span>
      </span>
    );
  }

  if (riskLevel) {
    switch (riskLevel) {
      case 'CRITICAL':
        return (
          <span className={`inline-flex items-center gap-1 rounded-full border bg-rose-100 text-rose-800 border-rose-300 font-semibold ${padding}`}>
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            <span>CRITICAL RISK</span>
          </span>
        );
      case 'HIGH':
        return (
          <span className={`inline-flex items-center gap-1 rounded-full border bg-rose-50 text-rose-700 border-rose-200 font-medium ${padding}`}>
            <AlertTriangle className="w-3 h-3 text-rose-500" />
            <span>HIGH RISK</span>
          </span>
        );
      case 'MEDIUM':
        return (
          <span className={`inline-flex items-center gap-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200 font-medium ${padding}`}>
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            <span>MEDIUM RISK</span>
          </span>
        );
      case 'LOW':
      default:
        return (
          <span className={`inline-flex items-center gap-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 ${padding}`}>
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>LOW RISK</span>
          </span>
        );
    }
  }

  switch (status) {
    case 'Verified':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 font-medium ${padding}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified</span>
        </span>
      );
    case 'Pending':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200 font-medium ${padding}`}>
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Pending</span>
        </span>
      );
    case 'Review Required':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full border bg-orange-50 text-orange-700 border-orange-200 font-medium ${padding}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
          <span>Review Required</span>
        </span>
      );
    case 'Flagged':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full border bg-rose-50 text-rose-700 border-rose-200 font-medium ${padding}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>Flagged</span>
        </span>
      );
    case 'Rejected':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full border bg-slate-100 text-slate-700 border-slate-300 font-medium ${padding}`}>
          <XCircle className="w-3.5 h-3.5 text-slate-600" />
          <span>Rejected</span>
        </span>
      );
    case 'Disputed':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full border bg-purple-50 text-purple-700 border-purple-200 font-medium ${padding}`}>
          <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
          <span>Disputed</span>
        </span>
      );
    case 'Active':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 ${padding}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Active</span>
        </span>
      );
    case 'In Hearing':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200 ${padding}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>In Hearing</span>
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 rounded-full border bg-slate-50 text-slate-700 border-slate-200 ${padding}`}>
          <span>{status || 'Unknown'}</span>
        </span>
      );
  }
};
