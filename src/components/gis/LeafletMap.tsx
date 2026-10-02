import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { LandRecord } from '../../types';
import { Layers, MapPin, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Navigation } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

// Fix standard leaflet icon paths
const customIcon = (color: string) => L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.4);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

interface LeafletMapProps {
  records: LandRecord[];
  selectedRecord?: LandRecord | null;
  onSelectRecord?: (record: LandRecord) => void;
  height?: string;
  showLayerControls?: boolean;
}

// Helper to recenter map when selected record changes
function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 14, { animate: true });
  }, [lat, lng, map]);
  return null;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  records,
  selectedRecord,
  onSelectRecord,
  height = '540px',
  showLayerControls = true
}) => {
  const [mapLayer, setMapLayer] = useState<'osm' | 'satellite' | 'terrain'>('osm');
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'pending' | 'flagged' | 'disputed'>('all');

  // Default center around Mysuru, Karnataka
  const defaultCenter: [number, number] = selectedRecord
    ? [selectedRecord.latitude, selectedRecord.longitude]
    : [12.2958, 76.6394];

  const filteredRecords = records.filter(r => {
    if (activeFilter === 'verified') return r.status === 'Verified';
    if (activeFilter === 'pending') return r.status === 'Pending' || r.status === 'Review Required';
    if (activeFilter === 'flagged') return r.status === 'Flagged';
    if (activeFilter === 'disputed') return r.status === 'Disputed';
    return true;
  });

  const getTileLayerUrl = () => {
    switch (mapLayer) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      case 'osm':
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  const getPolygonStyle = (record: LandRecord) => {
    const isSelected = selectedRecord?.recordId === record.recordId;
    let color = '#2563eb'; // blue
    let fillColor = '#3b82f6';

    if (record.status === 'Verified') {
      color = '#059669'; // emerald
      fillColor = '#10b981';
    } else if (record.status === 'Disputed') {
      color = '#7c3aed'; // purple
      fillColor = '#8b5cf6';
    } else if (record.status === 'Flagged') {
      color = '#e11d48'; // rose
      fillColor = '#f43f5e';
    } else if (record.status === 'Pending' || record.status === 'Review Required') {
      color = '#d97706'; // amber
      fillColor = '#f59e0b';
    }

    return {
      color: isSelected ? '#1e293b' : color,
      weight: isSelected ? 3.5 : 2,
      fillColor,
      fillOpacity: isSelected ? 0.65 : 0.4,
      dashArray: record.status === 'Disputed' ? '4,4' : undefined
    };
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-gov bg-slate-900" style={{ height }}>
      {/* Top Map Layer & Filter Floating Bar */}
      {showLayerControls && (
        <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Layer switcher */}
          <div className="pointer-events-auto bg-white/95 backdrop-blur-xs p-1 rounded-lg shadow-lg border border-slate-200 flex items-center space-x-1 text-xs">
            <button
              onClick={() => setMapLayer('osm')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mapLayer === 'osm' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cadastral Map
            </button>
            <button
              onClick={() => setMapLayer('satellite')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mapLayer === 'satellite' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite Imagery
            </button>
            <button
              onClick={() => setMapLayer('terrain')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mapLayer === 'terrain' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Topography
            </button>
          </div>

          {/* Status filters */}
          <div className="pointer-events-auto bg-white/95 backdrop-blur-xs p-1 rounded-lg shadow-lg border border-slate-200 flex items-center space-x-1 text-xs">
            {(['all', 'verified', 'pending', 'flagged', 'disputed'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2 py-1 rounded capitalize text-xs font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Leaflet Map Container */}
      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.esri.com">Esri</a>'
          url={getTileLayerUrl()}
        />

        {selectedRecord && (
          <MapRecenter lat={selectedRecord.latitude} lng={selectedRecord.longitude} />
        )}

        {/* Render Land Parcel Polygons & Markers */}
        {filteredRecords.map((rec) => {
          // Convert GeoJSON polygon coordinates [lng, lat] to Leaflet [lat, lng]
          const polygonPositions: [number, number][] = rec.boundaryGeoJson
            ? rec.boundaryGeoJson.coordinates.map(([lng, lat]) => [lat, lng])
            : [
                [rec.latitude - 0.001, rec.longitude - 0.001],
                [rec.latitude - 0.001, rec.longitude + 0.0015],
                [rec.latitude + 0.0012, rec.longitude + 0.0012],
                [rec.latitude + 0.001, rec.longitude - 0.001],
              ];

          const markerColor =
            rec.status === 'Verified'
              ? '#059669'
              : rec.status === 'Disputed'
              ? '#7c3aed'
              : rec.status === 'Flagged'
              ? '#e11d48'
              : '#d97706';

          return (
            <React.Fragment key={rec.recordId}>
              <Polygon
                positions={polygonPositions}
                pathOptions={getPolygonStyle(rec)}
                eventHandlers={{
                  click: () => onSelectRecord && onSelectRecord(rec)
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                  <div className="text-xs p-1">
                    <p className="font-bold text-slate-900">Survey No: {rec.surveyNumber}</p>
                    <p className="text-slate-600 font-medium">{rec.ownerName} • {rec.landArea} Acres</p>
                    <p className="text-[10px] text-blue-700 font-bold uppercase">{rec.status}</p>
                  </div>
                </Tooltip>
              </Polygon>

              <Marker
                position={[rec.latitude, rec.longitude]}
                icon={customIcon(markerColor)}
                eventHandlers={{
                  click: () => onSelectRecord && onSelectRecord(rec)
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px] text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-blue-900">SY: {rec.surveyNumber}</span>
                      <span className="text-[10px] font-bold text-slate-500">{rec.village}</span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm">{rec.ownerName}</p>
                    <p className="text-slate-600 mt-0.5">Area: <span className="font-semibold">{rec.landArea} Acres</span> ({rec.landType})</p>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-700">GIS Match: 96%</span>
                      <button
                        onClick={() => onSelectRecord && onSelectRecord(rec)}
                        className="text-[11px] font-bold text-blue-600 hover:underline"
                      >
                        Inspect Parcel →
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Bottom Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-20 pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-lg text-xs shadow-lg border border-slate-800 flex items-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-xs bg-emerald-500"></span>
          <span className="text-[11px] font-medium">Verified (90%+)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-xs bg-amber-500"></span>
          <span className="text-[11px] font-medium">Pending Review</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-xs bg-rose-500"></span>
          <span className="text-[11px] font-medium">Flagged / Overlap</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-xs bg-purple-500"></span>
          <span className="text-[11px] font-medium">Disputed</span>
        </div>
      </div>
    </div>
  );
};
