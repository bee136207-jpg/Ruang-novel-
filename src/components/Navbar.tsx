import React from 'react';
import { Plus, BookOpen, ArrowLeft, BookMarked, Sparkles, Archive, Grid } from 'lucide-react';
import { NovelFileType } from '../types/novel';

interface NavbarProps {
  onOpenAddModal: () => void;
  onReturnToEntrance: () => void;
  activeFileType: 'all' | NovelFileType;
  viewMode: 'grid' | 'shelf';
  onToggleViewMode: (mode: 'grid' | 'shelf') => void;
  fileBaruCount: number;
  fileLamaCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  onReturnToEntrance,
  activeFileType,
  viewMode,
  onToggleViewMode,
}) => {
  const isFileBaru = activeFileType === 'file_baru';
  const isFileLama = activeFileType === 'file_lama';

  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-slate-100 border-b border-sky-900/50 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-14">
          {/* Left: Back button + Brand */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onReturnToEntrance}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-750 text-sky-400 hover:text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Kembali ke Layar Masuk"
              aria-label="Kembali ke Layar Masuk"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-xs shrink-0">
                <BookMarked className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif-title text-sm sm:text-base font-bold tracking-wider text-white uppercase truncate">
                  Ruang Novel
                </span>
                <span
                  className={`text-[10px] tracking-wider uppercase font-sans font-semibold -mt-0.5 truncate ${
                    isFileBaru ? 'text-sky-400' : isFileLama ? 'text-amber-400' : 'text-slate-400'
                  }`}
                >
                  {isFileBaru ? 'Bilik File Baru' : isFileLama ? 'Bilik File Lama' : 'Semua Koleksi'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: View Mode Toggle & Add Button (Engineered to fit mobile screens perfectly without clipping) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* View Mode Toggle: Kartu vs Rak */}
            <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex items-center">
              <button
                onClick={() => onToggleViewMode('grid')}
                className={`p-1.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-sky-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tampilan Kartu"
                aria-label="Tampilan Kartu"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kartu</span>
              </button>
              <button
                onClick={() => onToggleViewMode('shelf')}
                className={`p-1.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  viewMode === 'shelf'
                    ? 'bg-sky-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tampilan Rak Buku"
                aria-label="Tampilan Rak Buku"
              >
                <span className="font-serif-title font-bold text-xs tracking-wider">IIII</span>
                <span className="hidden sm:inline">Rak</span>
              </button>
            </div>

            {/* Add Novel Button (Icon-only on mobile so it never overflows, with text on sm+) */}
            <button
              onClick={onOpenAddModal}
              className="h-8 px-2.5 sm:px-3 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm shadow-sky-600/30 transition-all flex items-center gap-1 cursor-pointer active:scale-95 shrink-0"
              title="Tambah Novel Baru"
              aria-label="Tambah Novel"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tambah</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
