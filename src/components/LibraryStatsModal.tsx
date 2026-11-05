import React, { useRef } from 'react';
import { Novel } from '../types/novel';
import { X, BarChart3, Download, Upload, RotateCcw, Sparkles, Archive } from 'lucide-react';

interface LibraryStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  novels: Novel[];
  onResetNovels: () => void;
  onImportNovels: (imported: Novel[]) => void;
}

export const LibraryStatsModal: React.FC<LibraryStatsModalProps> = ({
  isOpen,
  onClose,
  novels,
  onResetNovels,
  onImportNovels,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const fileBaruNovels = novels.filter((n) => n.fileType === 'file_baru');
  const fileLamaNovels = novels.filter((n) => n.fileType === 'file_lama');

  const totalPages = novels.reduce((acc, n) => acc + (n.pageCount || 0), 0);
  const totalChapters = novels.reduce((acc, n) => acc + n.chapters.length, 0);
  const completedNovels = novels.filter((n) => n.status === 'Selesai').length;
  const inProgressNovels = novels.filter((n) => n.status === 'Sedang Dibaca').length;
  const bookmarkedNovels = novels.filter((n) => n.isBookmarked).length;

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(novels, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ruang_novel_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title && parsed[0].fileType) {
          onImportNovels(parsed);
          alert(`Berhasil memuat ${parsed.length} novel ke Ruang Novel.`);
          onClose();
        } else {
          alert('Format berkas JSON tidak sesuai.');
        }
      } catch (err) {
        alert('Gagal membaca berkas JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-sky-900/60 text-slate-100 max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-400" />
            <h2 className="font-serif-title font-bold text-lg text-white">
              Statistik Ruang Novel
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* File Balance Meter: File Baru vs File Lama */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2 font-medium">
              <span className="flex items-center gap-1.5 text-sky-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>File Baru ({fileBaruNovels.length})</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <Archive className="w-3.5 h-3.5" />
                <span>File Lama ({fileLamaNovels.length})</span>
              </span>
            </div>

            {/* Split Progress Bar */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
              <div
                className="bg-sky-500 transition-all duration-300"
                style={{
                  width: `${novels.length ? (fileBaruNovels.length / novels.length) * 100 : 50}%`,
                }}
              />
              <div
                className="bg-amber-600 transition-all duration-300"
                style={{
                  width: `${novels.length ? (fileLamaNovels.length / novels.length) * 100 : 50}%`,
                }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center font-sans">
              Koleksi terbagi rapi antara naskah digital modern dan arsip klasik.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
              <div className="text-[11px] text-slate-400">Total Novel</div>
              <div className="text-xl font-bold font-mono text-white tabular-nums mt-0.5">
                {novels.length}
              </div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
              <div className="text-[11px] text-slate-400">Estimasi Halaman</div>
              <div className="text-xl font-bold font-mono text-white tabular-nums mt-0.5">
                {totalPages.toLocaleString()}
              </div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
              <div className="text-[11px] text-slate-400">Total Bab Digital</div>
              <div className="text-xl font-bold font-mono text-white tabular-nums mt-0.5">
                {totalChapters}
              </div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
              <div className="text-[11px] text-slate-400">Sedang Dibaca</div>
              <div className="text-xl font-bold font-mono text-sky-400 tabular-nums mt-0.5">
                {inProgressNovels}
              </div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
              <div className="text-[11px] text-slate-400">Tamat Dibaca</div>
              <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums mt-0.5">
                {completedNovels}
              </div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
              <div className="text-[11px] text-slate-400">Buku Ditandai</div>
              <div className="text-xl font-bold font-mono text-sky-300 tabular-nums mt-0.5">
                {bookmarkedNovels}
              </div>
            </div>
          </div>

          {/* Backup & Data Actions */}
          <div className="border-t border-slate-800 pt-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Pencadangan &amp; Pemulihan Koleksi
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleExportData}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Unduh Cadangan (JSON)</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4 text-sky-400" />
                <span>Pulihkan Koleksi (JSON)</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (confirm('Kembalikan seluruh Ruang Novel ke koleksi standar?')) {
                    onResetNovels();
                    onClose();
                  }
                }}
                className="w-full py-2 px-3 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                <span>Reset ke Koleksi Standar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
