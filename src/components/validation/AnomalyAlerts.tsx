import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Lightbulb, 
  FileSearch, 
  UserCheck, 
  MapPin, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { RiskLevel } from '../../types';

interface AnomalyAlertsProps {
  riskLevel: RiskLevel;
  anomalies: string[];
  recommendation: string;
  onEscalate?: () => void;
  onReview?: () => void;
}

export const AnomalyAlerts: React.FC<AnomalyAlertsProps> = ({
  riskLevel,
  anomalies,
  recommendation,
  onEscalate,
  onReview
}) => {
  const getRiskStyles = () => {
    switch (riskLevel) {
      case 'CRITICAL':
        return {
          cardBg: 'bg-rose-50 border-rose-200',
          titleColor: 'text-rose-950',
          iconColor: 'text-rose-600',
          badge: 'bg-rose-200 text-rose-900 border-rose-300'
        };
      case 'HIGH':
        return {
          cardBg: 'bg-rose-50/70 border-rose-200',
          titleColor: 'text-rose-900',
          iconColor: 'text-rose-600',
          badge: 'bg-rose-100 text-rose-800 border-rose-200'
        };
      case 'MEDIUM':
        return {
          cardBg: 'bg-amber-50/70 border-amber-200',
          titleColor: 'text-amber-950',
          iconColor: 'text-amber-600',
          badge: 'bg-amber-100 text-amber-800 border-amber-200'
        };
      case 'LOW':
      default:
        return {
          cardBg: 'bg-emerald-50/70 border-emerald-200',
          titleColor: 'text-emerald-950',
          iconColor: 'text-emerald-600',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200'
        };
    }
  };

  const styles = getRiskStyles();

  return (
    <div className={`rounded-xl border p-5 ${styles.cardBg} shadow-gov space-y-4`}>
      {/* Top Risk Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/5">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-white shadow-xs">
            {riskLevel === 'LOW' ? (
              <CheckCircle2 className={`w-5 h-5 ${styles.iconColor}`} />
            ) : (
              <ShieldAlert className={`w-5 h-5 ${styles.iconColor}`} />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className={`text-sm font-bold ${styles.titleColor}`}>
                AI Anomaly & Fraud Risk Detection Engine
              </h4>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${styles.badge}`}>
                {riskLevel} RISK
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Automated pattern analysis scanning for survey duplication, deed tampering, and boundary collisions.
            </p>
          </div>
        </div>

        {(onEscalate || onReview) && (
          <div className="flex items-center gap-2 shrink-0">
            {onReview && (
              <button
                onClick={onReview}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-800 shadow-xs transition-colors"
              >
                Review Record
              </button>
            )}
            {onEscalate && (
              <button
                onClick={onEscalate}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-xs transition-colors"
              >
                Escalate to District Authority
              </button>
            )}
          </div>
        )}
      </div>

      {/* Anomalies List */}
      {anomalies.length > 0 ? (
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Detected Irregularities ({anomalies.length})
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {anomalies.map((anomaly, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-lg border border-slate-200/80 flex items-start space-x-2.5 shadow-xs"
              >
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-800 leading-relaxed font-medium">
                  {anomaly}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Zero anomaly signals detected. Record complies with all cadastral integrity rules.</span>
        </div>
      )}

      {/* AI Recommendation Banner */}
      <div className="p-3.5 bg-white rounded-lg border border-blue-200 flex items-start space-x-3 shadow-xs">
        <div className="p-1.5 rounded bg-blue-50 text-blue-700 shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-xs">
          <span className="font-bold text-blue-900 block">AI Official Recommendation:</span>
          <p className="text-slate-700 mt-0.5 font-medium leading-relaxed">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
};
