import React, { useState } from 'react';
import { 
  Landmark, 
  MapPin, 
  Calendar, 
  User, 
  FileText, 
  History, 
  ShieldCheck, 
  Scale, 
  Download, 
  Printer, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { LandRecord } from '../../types';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { ExportService } from '../../services/exportService';

interface RecordProfileModalProps {
  record: LandRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReview?: (record: LandRecord) => void;
  onOpenMap?: (record: LandRecord) => void;
}

export const RecordProfileModal: React.FC<RecordProfileModalProps> = ({
  record,
  isOpen,
  onClose,
  onOpenReview,
  onOpenMap
}) => {
  const [activeSection, setActiveSection] = useState<
    'ownership' | 'property' | 'registration' | 'mutation' | 'documents' | 'gis' | 'disputes' | 'audit'
  >('ownership');

  if (!record) return null;

  const handleExportPdf = () => {
    ExportService.generateOfficialRecordPdf(record);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Land Record Master Profile: Survey ${record.surveyNumber}`}
      subtitle={`Khata: ${record.khataNumber} • ${record.village}, ${record.taluk}, ${record.district} • State: ${record.state}`}
      maxWidth="6xl"
      headerActions={
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportPdf}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Certificate PDF</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Highlight Summary Banner */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-3 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-tight">{record.ownerName}</h3>
                <StatusBadge status={record.status} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                S/o {record.fatherName} • {record.ownershipType} • Registration: {record.registrationDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block font-semibold">TOTAL AREA</span>
              <span className="text-sm font-bold text-slate-100">{record.landArea} Acres</span>
            </div>
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block font-semibold">AI CONFIDENCE</span>
              <span className="text-sm font-bold text-emerald-400">{record.validationScore}%</span>
            </div>
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block font-semibold">RISK LEVEL</span>
              <span className={`text-sm font-bold ${record.riskLevel === 'LOW' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {record.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto border-b border-slate-200 pb-1 text-xs font-bold text-slate-600">
          {[
            { id: 'ownership', label: '1. Ownership Info', icon: User },
            { id: 'property', label: '2. Property Details', icon: Landmark },
            { id: 'registration', label: '3. Registration & Deed', icon: FileText },
            { id: 'mutation', label: '4. Mutation Timeline', icon: History },
            { id: 'gis', label: '5. GIS & Boundary', icon: MapPin },
            { id: 'disputes', label: '6. Disputes & Claims', icon: Scale },
            { id: 'documents', label: '7. Document Archive', icon: FileText },
            { id: 'audit', label: '8. Audit Trail', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-xs'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section 1: Ownership Information */}
        {activeSection === 'ownership' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h5 className="font-bold text-slate-900 border-b pb-2">Primary Title Holder</h5>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-slate-500">Full Legal Name:</span>
                <span className="font-bold text-slate-800">{record.ownerName}</span>
                <span className="text-slate-500">Father / Husband Name:</span>
                <span className="font-medium text-slate-800">{record.fatherName}</span>
                <span className="text-slate-500">Ownership Classification:</span>
                <span className="font-medium text-slate-800">{record.ownershipType}</span>
                <span className="text-slate-500">Aadhaar Seeding Status:</span>
                <span className="font-bold text-emerald-700">Verified (UIDAI Seeded)</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h5 className="font-bold text-slate-900 border-b pb-2">Joint / Co-Owners (Khatedars)</h5>
              {record.jointOwners && record.jointOwners.length > 0 ? (
                <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                  {record.jointOwners.map((owner, idx) => (
                    <li key={idx} className="font-medium">{owner}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 italic">No secondary joint owners registered.</p>
              )}
            </div>
          </div>
        )}

        {/* Section 2: Property Information */}
        {activeSection === 'property' && (
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-slate-500 block">Survey & Hissa:</span>
                <span className="text-sm font-bold text-blue-700">{record.surveyNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Khata Account:</span>
                <span className="text-sm font-bold text-slate-800">{record.khataNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Area Extent:</span>
                <span className="text-sm font-bold text-slate-800">{record.landAreaFormatted || `${record.landArea} Acres`}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Land Use Type:</span>
                <span className="font-semibold text-slate-800">{record.landType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Market Valuation:</span>
                <span className="font-bold text-emerald-700">₹{(record.marketValuationInr || 4500000).toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Soil Classification:</span>
                <span className="font-medium text-slate-800">Red Loamy (ಖುಷ್ಕಿ ವರ್ಗ ೧)</span>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Registration */}
        {activeSection === 'registration' && (
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs space-y-3">
            <h5 className="font-bold text-slate-900 border-b pb-2">Sub-Registrar Archival Information</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 block">Deed Registration Date:</span>
                <span className="font-semibold text-slate-800">{record.registrationDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Mutation Register (MR) No:</span>
                <span className="font-mono font-bold text-slate-800">{record.mutationNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Sub-Registrar Office:</span>
                <span className="font-semibold text-slate-800">Office of the Sub-Registrar, {record.taluk}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Archival Volume Index:</span>
                <span className="font-mono text-slate-800">Vol 42, Book I, Pages 118-124</span>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Mutation History Timeline */}
        {activeSection === 'mutation' && (
          <div className="p-5 bg-white rounded-xl border border-slate-200">
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Historical Mutation & Ownership Lifecycle
            </h5>
            <div className="border-l-2 border-blue-600 pl-6 space-y-6 text-xs">
              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
                <span className="text-[11px] font-bold text-blue-700">1998</span>
                <h6 className="font-bold text-slate-900 mt-0.5">{record.ownerName} acquired land</h6>
                <p className="text-slate-600">Registered under Deed #{record.mutationNumber} through Sub-Registrar {record.taluk}.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
                <span className="text-[11px] font-bold text-blue-700">2008</span>
                <h6 className="font-bold text-slate-900 mt-0.5">Mutation record updated in State Land Registry</h6>
                <p className="text-slate-600">Computerized RoR generated via Bhoomi system integration.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
                <span className="text-[11px] font-bold text-blue-700">2015</span>
                <h6 className="font-bold text-slate-900 mt-0.5">Boundary survey completed & Cadastral Tippani drawn</h6>
                <p className="text-slate-600">DGPS demarcation stones installed along perimeter.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
                <span className="text-[11px] font-bold text-blue-700">2021</span>
                <h6 className="font-bold text-slate-900 mt-0.5">Archival Digitization Completed</h6>
                <p className="text-slate-600">High-resolution optical scan indexed into State Cloud repository.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100"></span>
                <span className="text-[11px] font-bold text-emerald-700">2026 (Active)</span>
                <h6 className="font-bold text-slate-900 mt-0.5">AI Validation & Cross-Verification Completed</h6>
                <p className="text-slate-600">BhoomiVerify AI analyzed 18 parameters with {record.validationScore}% confidence.</p>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: GIS & Boundaries */}
        {activeSection === 'gis' && (
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-bold text-slate-900">Cadastral GIS Boundary Coordinates</h5>
                <p className="text-slate-500">Centroid: {record.latitude.toFixed(4)}° N, {record.longitude.toFixed(4)}° E</p>
              </div>
              {onOpenMap && (
                <button
                  onClick={() => {
                    onOpenMap(record);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Full GIS Map</span>
                </button>
              )}
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700 font-mono text-[11px]">
              <p className="font-bold text-slate-900 mb-1">Cadastral Polygon Points (WGS84 GeoJSON):</p>
              {record.boundaryGeoJson ? (
                <p>{JSON.stringify(record.boundaryGeoJson.coordinates)}</p>
              ) : (
                <p>Coordinates calculated from Village Cadastral Map #TIPP-{record.surveyNumber.replace('/', '-')}</p>
              )}
            </div>
          </div>
        )}

        {/* Section 6: Disputes */}
        {activeSection === 'disputes' && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            {record.status === 'Disputed' ? (
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-900">
                  <p className="font-bold">Active Dispute Pending in Senior Civil Court</p>
                  <p className="mt-1">Injunction OS No. 412/2023 filed regarding undivided ancestral share.</p>
                </div>
              </div>
            ) : (
              <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>No active litigation, court stay, or civil disputes registered for this survey number.</span>
              </p>
            )}
          </div>
        )}

        {/* Section 7: Documents */}
        {activeSection === 'documents' && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
            <h5 className="font-bold text-slate-900">Archived Electronic Records</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Scanned RTC Record (1998)</span>
                </div>
                <button onClick={handleExportPdf} className="text-blue-600 font-bold hover:underline">Download</button>
              </div>
              <div className="p-3 bg-white rounded-lg border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>AI Validation Extract (2026)</span>
                </div>
                <button onClick={handleExportPdf} className="text-emerald-600 font-bold hover:underline">Download</button>
              </div>
            </div>
          </div>
        )}

        {/* Section 8: Audit Trail */}
        {activeSection === 'audit' && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <h5 className="font-bold text-slate-900 mb-2">Record Specific Audit Log</h5>
            <div className="space-y-1.5 text-slate-600">
              <p>• <strong>02-OCT-2026 09:15 AM:</strong> AI Validation Engine executed by Shri Rajesh Sharma (EMP-RD-4821).</p>
              <p>• <strong>01-OCT-2026 14:10 PM:</strong> Cadastral GIS overlay synced with Karnataka DILRMP Gateway.</p>
              <p>• <strong>28-SEP-2026 11:20 AM:</strong> Document scanned from Sub-Registrar microfilm archive.</p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-400">Record ID: {record.recordId}</span>
          {onOpenReview && (
            <button
              onClick={() => {
                onOpenReview(record);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs"
            >
              Open Officer Verification Queue
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
