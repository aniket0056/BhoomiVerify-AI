import React, { useState } from 'react';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Download, 
  MapPin, 
  FileText, 
  FileSpreadsheet,
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Sparkles,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DataTable, ColumnDef } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { RecordProfileModal } from '../components/records/RecordProfileModal';
import { ExportService } from '../services/exportService';
import { LandRecord, LandType, RecordStatus } from '../types';

export const LandRecordsPage: React.FC = () => {
  const { 
    records, 
    selectedRecordForDetail, 
    setSelectedRecordForDetail,
    setSelectedRecordForReview,
    setActiveTab,
    selectedDistrict 
  } = useApp();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeLandTypeFilter, setActiveLandTypeFilter] = useState<string>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');

  // Filtered dataset
  const filteredRecords = records.filter(r => {
    if (selectedDistrict !== 'All Districts' && r.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
      return false;
    }
    if (activeLandTypeFilter !== 'all' && r.landType !== activeLandTypeFilter) {
      return false;
    }
    if (activeStatusFilter !== 'all' && r.status !== activeStatusFilter) {
      return false;
    }
    return true;
  });

  const handleOpenDetail = (record: LandRecord) => {
    setSelectedRecordForDetail(record);
    setIsProfileModalOpen(true);
  };

  const handleExportCsv = () => {
    ExportService.exportRecordsToCsv(filteredRecords);
  };

  const columns: ColumnDef<LandRecord>[] = [
    {
      key: 'recordId',
      header: 'Record ID',
      sortable: true,
      render: (r) => (
        <span className="font-mono font-bold text-blue-900">
          {r.recordId}
        </span>
      )
    },
    {
      key: 'ownerName',
      header: 'Owner & Father Name',
      sortable: true,
      render: (r) => (
        <div>
          <p className="font-bold text-slate-900">{r.ownerName}</p>
          <p className="text-[10px] text-slate-500">S/o {r.fatherName}</p>
        </div>
      )
    },
    {
      key: 'surveyNumber',
      header: 'Survey No',
      sortable: true,
      render: (r) => (
        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
          {r.surveyNumber}
        </span>
      )
    },
    {
      key: 'khataNumber',
      header: 'Khata No',
      sortable: true,
      render: (r) => <span className="font-mono text-slate-700">{r.khataNumber}</span>
    },
    {
      key: 'location',
      header: 'Village / District',
      sortable: true,
      render: (r) => (
        <div>
          <p className="font-semibold text-slate-800">{r.village}</p>
          <p className="text-[10px] text-slate-500">{r.taluk}, {r.district}</p>
        </div>
      )
    },
    {
      key: 'landArea',
      header: 'Extent',
      sortable: true,
      render: (r) => (
        <div>
          <p className="font-bold text-slate-900">{r.landArea} Acres</p>
          <p className="text-[10px] text-slate-500">{r.landType}</p>
        </div>
      )
    },
    {
      key: 'validationScore',
      header: 'AI Confidence',
      sortable: true,
      className: 'text-center',
      render: (r) => <StatusBadge confidence={r.validationScore} />
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      className: 'text-center',
      render: (r) => <StatusBadge status={r.status} />
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (r) => (
        <div className="flex items-center justify-end space-x-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => handleOpenDetail(r)}
            className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            title="View Full Land Profile"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => ExportService.generateOfficialRecordPdf(r)}
            className="p-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold"
            title="Download Certificate PDF"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
              Cadastral Registry
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Total Records: <strong className="text-slate-800">{filteredRecords.length}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Universal Land Records Repository
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Search, filter, and inspect verified digital land parcels, mutation records, and ownership deeds.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setActiveTab('digitize')}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Digitize New Record</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-gov flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Land Type Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-slate-600">Land Type:</span>
            <select
              value={activeLandTypeFilter}
              onChange={(e) => setActiveLandTypeFilter(e.target.value)}
              className="p-1.5 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800 focus:outline-hidden"
            >
              <option value="all">All Types</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Forest / Wasteland">Forest / Wasteland</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-slate-600">Status:</span>
            <select
              value={activeStatusFilter}
              onChange={(e) => setActiveStatusFilter(e.target.value)}
              className="p-1.5 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800 focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Review Required">Review Required</option>
              <option value="Flagged">Flagged</option>
              <option value="Disputed">Disputed</option>
            </select>
          </div>
        </div>

        <div className="text-slate-400 text-[11px]">
          Showing {filteredRecords.length} of {records.length} total parcels
        </div>
      </div>

      {/* Main Data Table */}
      <DataTable
        data={filteredRecords}
        columns={columns}
        keyExtractor={(r) => r.recordId}
        searchableKey={(r) => `${r.recordId} ${r.ownerName} ${r.surveyNumber} ${r.khataNumber} ${r.village} ${r.district}`}
        searchPlaceholder="Filter land records by Survey No, Owner, Khata, Village..."
        pageSize={8}
        onRowClick={handleOpenDetail}
      />

      {/* Detailed Land Record Profile Modal */}
      <RecordProfileModal
        record={selectedRecordForDetail}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onOpenReview={(r) => {
          setSelectedRecordForReview(r);
          setActiveTab('verification');
        }}
        onOpenMap={(r) => {
          setActiveTab('gis');
        }}
      />
    </div>
  );
};
