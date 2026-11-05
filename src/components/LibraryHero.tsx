import React from 'react';
import { Search, Sparkles, Archive, SlidersHorizontal } from 'lucide-react';
import { NovelFileType } from '../types/novel';

interface LibraryHeroProps {
  activeFileType: 'all' | NovelFileType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  genres: string[];
  totalNovels: number;
  fileBaruCount: number;
  fileLamaCount: number;
}

export const LibraryHero: React.FC<LibraryHeroProps> = ({
  activeFileType,
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  genres,
  totalNovels,
  fileBaruCount,
  fileLamaCount,
}) => {
  const isFileBaru = activeFileType === 'file_baru';
  const isFileLama = activeFileType === 'file_lama';

  const currentCount = isFileBaru
    ? fileBaruCount
    : isFileLama
    ? fileLamaCount
    : totalNovels;

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-sky-900/40 text-slate-100 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Compact Header: Room Title + Novel Count */}
          <div className="flex items-center gap-2">
            <span
              className={`p-1.5 rounded-md ${
                isFileBaru
                  ? 'bg-sky-950 text-sky-400 border border-sky-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}
            >
              {isFileBaru ? <Sparkles className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
            </span>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-serif-title font-bold text-white tracking-wide">
                {isFileBaru
                  ? 'Bilik File Baru'
                  : isFileLama
                  ? 'Bilik File Lama'
                  : 'Semua Koleksi'}
              </h1>
              <span className="text-[11px] font-mono text-sky-300 bg-sky-950/80 px-2 py-0.2 rounded-full border border-sky-800 font-semibold">
                {currentCount} Novel
              </span>
            </div>
          </div>

          {/* Compact Search & Genre Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full sm:w-auto sm:min-w-[340px] md:min-w-[420px]">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-sky-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari novel atau penulis..."
                className="w-full pl-8 pr-12 py-1.5 bg-slate-800/90 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-sky-400 hover:text-sky-300 font-medium cursor-pointer"
                >
                  Hapus
                </button>
              )}
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <select
                value={selectedGenre}
                onChange={(e) => onGenreChange(e.target.value)}
                aria-label="Filter genre"
                className="w-full bg-slate-800/90 border border-slate-700 text-slate-200 text-xs rounded-lg pl-2.5 pr-6 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer truncate"
              >
                <option value="all">Semua Genre ({currentCount})</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
