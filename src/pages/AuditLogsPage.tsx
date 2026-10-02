import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Lock, 
  UserCheck,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DataTable, ColumnDef } from '../components/common/DataTable';
import { ExportService } from '../services/exportService';
import { AuditLog } from '../types';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs } = useApp();
  const [moduleFilter, setModuleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLogs = auditLogs.filter(log => {
    if (moduleFilter !== 'all' && !log.module.toLowerCase().includes(moduleFilter.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && log.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    ExportService.exportAuditLogsToCsv(filteredLogs);
  };

  const columns: ColumnDef<AuditLog>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (l) => (
        <span className="font-mono text-[11px] text-slate-600">
          {l.timestamp}
        </span>
      )
    },
    {
      key: 'officerName',
      header: 'Officer & ID',
      sortable: true,
      render: (l) => (
        <div>
          <p className="font-bold text-slate-900">{l.officerName}</p>
          <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
            {l.officerId}
          </span>
        </div>
      )
    },
    {
      key: 'action',
      header: 'Action / Event',
      sortable: true,
      render: (l) => (
        <div>
          <p className="font-bold text-slate-800">{l.action}</p>
          {l.details && <p className="text-[10px] text-slate-500 max-w-sm truncate">{l.details}</p>}
        </div>
      )
    },
    {
      key: 'recordId',
      header: 'Target Record',
      sortable: true,
      render: (l) => (
        <span className="font-mono text-xs font-semibold text-slate-800">
          {l.recordId || 'System / Config'}
        </span>
      )
    },
    {
      key: 'module',
      header: 'Portal Module',
      sortable: true,
      render: (l) => (
        <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
          {l.module}
        </span>
      )
    },
    {
      key: 'ipAddress',
      header: 'Network IP',
      sortable: true,
      render: (l) => <span className="font-mono text-[11px] text-slate-500">{l.ipAddress}</span>
    },
    {
      key: 'status',
      header: 'Log Status',
      sortable: true,
      className: 'text-center',
      render: (l) => {
        let badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        if (l.status === 'Warning') badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
        if (l.status === 'Security Alert') badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200 font-bold';

        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] border ${badgeStyle}`}>
            {l.status}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
              Security & Compliance
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Immutable Cadastral Ledger (256-Bit Signed)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            System Audit Trail & Access Logs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Every document upload, field modification, AI verification, and approval action is permanently logged.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-gov flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-slate-600">Module:</span>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="p-1.5 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800 focus:outline-hidden"
            >
              <option value="all">All Modules</option>
              <option value="Digitize">Digitize Records</option>
              <option value="Validation">AI Validation Engine</option>
              <option value="Verification">Verification Queue</option>
              <option value="Duplicate">Duplicate Detection</option>
              <option value="Dispute">Dispute Records</option>
              <option value="Admin">Admin & System</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-slate-600">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-1.5 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800 focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Warning">Warning</option>
              <option value="Security Alert">Security Alert</option>
            </select>
          </div>
        </div>

        <div className="text-slate-400 text-[11px]">
          Total Entries: {filteredLogs.length} events logged
        </div>
      </div>

      {/* Main Audit Data Table */}
      <DataTable
        data={filteredLogs}
        columns={columns}
        keyExtractor={(l) => l.logId}
        searchableKey={(l) => `${l.logId} ${l.officerName} ${l.officerId} ${l.action} ${l.recordId || ''} ${l.module}`}
        searchPlaceholder="Filter audit trail by Officer, Action, Record ID, IP..."
        pageSize={10}
      />
    </div>
  );
};
