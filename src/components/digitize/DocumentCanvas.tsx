import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Maximize2, FileText, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface DocumentCanvasProps {
  svgContent: string;
  documentTitle: string;
  totalPages?: number;
  activeFieldHover?: string | null;
}

export const DocumentCanvas: React.FC<DocumentCanvasProps> = ({
  svgContent,
  documentTitle,
  totalPages = 1,
  activeFieldHover
}) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMode, setFilterMode] = useState<'normal' | 'enhance' | 'invert'>('normal');

  const handleZoomIn = () => setZoom(z => Math.min(180, z + 15));
  const handleZoomOut = () => setZoom(z => Math.max(70, z - 15));
  const handleRotate = () => setRotation(r => (r + 90) % 360);

  const getFilterStyle = () => {
    switch (filterMode) {
      case 'enhance':
        return 'contrast(125%) brightness(95%)';
      case 'invert':
        return 'invert(90%) hue-rotate(180deg)';
      default:
        return 'none';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
      {/* Top Toolbar */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2 truncate">
          <FileText className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-semibold text-slate-200 truncate">{documentTitle}</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Filter toggle */}
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 text-[11px] rounded px-2 py-1 text-slate-300 focus:outline-hidden"
          >
            <option value="normal">Standard View</option>
            <option value="enhance">AI Enhanced Contrast</option>
            <option value="invert">Microfilm Invert</option>
          </select>

          <button
            onClick={handleZoomOut}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-1.5 text-[11px] font-mono text-slate-400">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRotate}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Rotate 90°"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/80 min-h-[460px] relative">
        <div
          style={{
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            filter: getFilterStyle(),
            transition: 'transform 0.2s ease, filter 0.2s ease',
            transformOrigin: 'center center',
          }}
          className="relative max-w-full rounded shadow-2xl bg-white select-none pointer-events-auto"
        >
          {/* Render Document SVG */}
          <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            className="w-[480px] sm:w-[560px] aspect-[1/1.4]"
          />

          {/* Simulated AI OCR Bounding Box overlay for hovered field */}
          {activeFieldHover && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/3 left-8 right-8 h-12 border-2 border-blue-500 bg-blue-500/10 rounded animate-pulse flex items-center justify-end px-2">
                <span className="bg-blue-600 text-white text-[9px] font-bold px-1 rounded shadow-xs">
                  AI OCR Zone
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Strip */}
      {totalPages > 1 && (
        <div className="p-2 bg-slate-900 border-t border-slate-800 flex items-center justify-center space-x-3 text-xs text-slate-400">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
