import React from 'react';
import { X, ZoomIn, Download, Info } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export default function PhotoLightbox({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>NASA HIGH-DEFINITION ARCHIVAL PHOTOGRAPH</span>
          </div>
          <button
            onClick={() => {
              spaceAudio.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Container */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-black/60">
          <img
            src={photo.image || photo.url}
            alt={photo.caption || photo.title || 'NASA Mission Photograph'}
            className="max-h-[68vh] w-auto object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Caption & Metadata Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/90 text-sm">
          <h4 className="font-bold text-white mb-1">
            {photo.heading || photo.title || 'Archival Photographic Record'}
          </h4>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {photo.caption || photo.text}
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-900 pt-2">
            <span>NASA Public Domain Space Archive</span>
            <span>Uncompressed Telemetry Stream</span>
          </div>
        </div>
      </div>
    </div>
  );
}
