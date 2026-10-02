import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Sparkles, Database, FileText } from 'lucide-react';
import { ValidationCheckResult } from '../../types';

interface ComparisonTableProps {
  checks: ValidationCheckResult[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ checks }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden">
      <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-slate-900 tracking-tight">
            Side-by-Side Verification: Extracted Record vs. Official Government Database
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated field-level diff with confidence weighting and discrepancy indicators.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-100/70 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-4 py-3.5 w-1/5">Field Parameter</th>
              <th className="px-4 py-3.5 w-1/4">
                <div className="flex items-center space-x-1.5 text-blue-800">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Extracted From Digitized Document</span>
                </div>
              </th>
              <th className="px-4 py-3.5 w-1/4">
                <div className="flex items-center space-x-1.5 text-slate-800">
                  <Database className="w-3.5 h-3.5" />
                  <span>Existing Government Database</span>
                </div>
              </th>
              <th className="px-4 py-3.5 w-24 text-center">Confidence</th>
              <th className="px-4 py-3.5 w-32 text-center">Match Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {checks.map((check, idx) => {
              const isMismatch = check.status === 'MISMATCH';
              const isPartial = check.status === 'PARTIAL MATCH';
              const isMatched = check.status === 'MATCHED';

              return (
                <tr
                  key={check.checkName}
                  className={`transition-colors ${
                    isMismatch
                      ? 'bg-rose-50/60 font-semibold'
                      : isPartial
                      ? 'bg-amber-50/50'
                      : 'hover:bg-slate-50/60'
                  }`}
                >
                  {/* Field Name */}
                  <td className="px-4 py-3.5 font-bold text-slate-900 flex flex-col">
                    <span>{check.checkName}</span>
                    {check.notes && (
                      <span className="text-[10px] font-normal text-slate-400 mt-0.5">
                        {check.notes}
                      </span>
                    )}
                  </td>

                  {/* Extracted Value */}
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        isMismatch
                          ? 'bg-rose-100 text-rose-900 border border-rose-200 font-bold'
                          : isPartial
                          ? 'bg-amber-100 text-amber-900 font-semibold'
                          : 'text-slate-800'
                      }`}
                    >
                      {check.extractedValue}
                    </span>
                  </td>

                  {/* Government DB Value */}
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        isMismatch
                          ? 'bg-slate-100 text-slate-900 border border-slate-300 font-bold'
                          : 'text-slate-800'
                      }`}
                    >
                      {check.govtRecordValue}
                    </span>
                  </td>

                  {/* Confidence Score */}
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        check.confidence >= 90
                          ? 'bg-emerald-100 text-emerald-800'
                          : check.confidence >= 75
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      {check.confidence}%
                    </span>
                  </td>

                  {/* Match Status Badge */}
                  <td className="px-4 py-3.5 text-center">
                    {isMatched ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        MATCHED
                      </span>
                    ) : isPartial ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertTriangle className="w-3 h-3" />
                        PARTIAL MATCH
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                        <XCircle className="w-3 h-3" />
                        MISMATCH
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
