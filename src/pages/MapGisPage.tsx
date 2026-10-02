import React, { useState } from 'react';
import { 
  Map as MapIcon, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  Maximize2,
  FileText,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LeafletMap } from '../components/gis/LeafletMap';
import { StatusBadge } from '../components/common/StatusBadge';
import { LandRecord } from '../types';

export const MapGisPage: React.FC = () => {
  const { 
    records, 
    selectedRecordForDetail, 
    setSelectedRecordForDetail, 
    setSelectedRecordForReview,
    setActiveTab,
    selectedDistrict 
  } = useApp();

  const filteredRecords = selectedDistrict === 'All Districts'
    ? records
    : records.filter(r => r.district.toLowerCase() === selectedDistrict.toLowerCase());

  const [activeParcel, setActiveParcel] = useState<LandRecord>(
    selectedRecordForDetail || filteredRecords[0] || records[0]
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
              Spatial Intelligence
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Karnataka Cadastral DGPS Grid
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Cadastral GIS Map & Parcel Boundary Viewer
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive GIS geospatial engine showing cadastral boundary polygons, satellite overlays, and encroachment alerts.
          </p>
        </div>
      </div>

      {/* Main Grid: Map on Left, Parcel Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Map View */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden">
          <LeafletMap
            records={filteredRecords}
            selectedRecord={activeParcel}
            onSelectRecord={(rec) => setActiveParcel(rec)}
            height="580px"
          />
        </div>

        {/* Right Cadastral Parcel Inspector */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-gov p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Inspected Parcel Telemetry
              </h3>
            </div>
            <StatusBadge status={activeParcel.status} />
          </div>

          {/* Survey No Card */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase text-blue-700">Survey Number</span>
              <span className="font-mono text-[10px] text-slate-500">{activeParcel.recordId}</span>
            </div>
            <h4 className="text-xl font-black text-blue-950">{activeParcel.surveyNumber}</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Village: <strong className="text-slate-900">{activeParcel.village}</strong>, {activeParcel.taluk} ({activeParcel.district})
            </p>
          </div>

          {/* Key Attributes */}
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Registered Owner:</span>
              <span className="font-bold text-slate-900">{activeParcel.ownerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Father / Guardian:</span>
              <span className="text-slate-800">{activeParcel.fatherName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Land Extent Area:</span>
              <span className="font-bold text-slate-900">{activeParcel.landArea} Acres ({activeParcel.landType})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Khata Account:</span>
              <span className="font-mono text-slate-800">{activeParcel.khataNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Mutation Number:</span>
              <span className="font-mono text-slate-800">{activeParcel.mutationNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Cadastral Centroid:</span>
              <span className="font-mono text-slate-800">{activeParcel.latitude.toFixed(4)}° N, {activeParcel.longitude.toFixed(4)}° E</span>
            </div>
          </div>

          {/* GIS Boundary Verification Gauge */}
          <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-emerald-950 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>GIS Boundary Match Score</span>
              </span>
              <span className="font-extrabold text-emerald-700 text-sm">
                {activeParcel.status === 'Disputed' ? '62%' : activeParcel.riskLevel === 'HIGH' ? '84%' : '96%'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800">
              DGPS demarcation stones align with 2021 aerial drone survey map.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setSelectedRecordForDetail(activeParcel);
                setActiveTab('records');
              }}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span>View Full Master Profile</span>
            </button>

            <button
              onClick={() => {
                setSelectedRecordForReview(activeParcel);
                setActiveTab('verification');
              }}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Open Officer Verification</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
