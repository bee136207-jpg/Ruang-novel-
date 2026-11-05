import React from 'react';
import { NovelFileType } from '../types/novel';
import { Sparkles, Archive, ArrowRight, BookOpen, Layers, Library } from 'lucide-react';

interface EntranceScreenProps {
  onEnter: (fileType: NovelFileType | 'all', viewMode?: 'grid' | 'shelf') => void;
  fileBaruCount: number;
  fileLamaCount: number;
}

export const EntranceScreen: React.FC<EntranceScreenProps> = ({
  onEnter,
  fileBaruCount,
  fileLamaCount,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background celestial glow lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 -left-10 w-60 h-60 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top minimal brand indicator */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-xs">
            <Library className="w-3.5 h-3.5" />
          </div>
          <span className="font-serif-title font-bold text-base tracking-wider text-white uppercase">
            Ruang Novel
          </span>
        </div>

        <div className="text-[10px] text-sky-300/80 font-mono tracking-wider">
          PERPUSTAKAAN DIGITAL
        </div>
      </header>

      {/* Main Center Stage: Compact 3D Book & Compact Entry Cards */}
      <main className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 py-2 sm:py-4 flex flex-col items-center text-center">
        {/* Welcoming Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-900/60 border border-sky-400/40 text-sky-300 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md mb-2 shadow-xs">
          <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
          <span>Selamat Datang</span>
        </div>

        {/* Greeting Headline */}
        <h1 className="text-2xl sm:text-4xl font-book-title font-bold text-white tracking-tight mb-1.5">
          Selamat Datang di{' '}
          <span className="bg-gradient-to-r from-sky-400 via-sky-200 to-sky-400 bg-clip-text text-transparent">
            Ruang Novel
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-sans leading-relaxed mb-4">
          Pilih bilik naskah untuk mulai membaca secara terpisah dan rapi.
        </p>

        {/* Compact 3D Rotating Book Animation */}
        <div className="perspective-1000 w-44 h-56 flex items-center justify-center relative mb-5">
          <div className="absolute w-36 h-44 bg-sky-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />

          <div
            className="animate-spin-book relative w-36 h-48 cursor-grab select-none transition-transform"
            title="Buku 3D Ruang Novel (Sorot kursor untuk menghentikan putaran)"
          >
            {/* Front Cover */}
            <div
              className="absolute inset-0 rounded-r-md border-2 border-sky-400/60 shadow-xl overflow-hidden flex flex-col justify-between p-3 text-center"
              style={{
                backgroundColor: '#0369a1',
                transform: 'translateZ(12px)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="absolute inset-1 border border-sky-300/40 rounded-r pointer-events-none" />
              <div className="text-[8px] tracking-widest uppercase font-serif text-sky-200">
                Pustaka Dwirupa
              </div>

              <div className="my-auto px-1">
                <div className="w-6 h-6 mx-auto mb-1 rounded-full border border-sky-200/50 flex items-center justify-center text-sky-200 text-[10px]">
                  ❖
                </div>
                <h2 className="font-serif-title font-bold text-sm text-white tracking-wider uppercase leading-tight">
                  Ruang Novel
                </h2>
                <p className="text-[9px] text-sky-100 font-serif italic mt-0.5">
                  File Baru · File Lama
                </p>
              </div>

              <div className="text-[8px] uppercase tracking-wider text-sky-300 font-mono">
                Edisi 2026
              </div>
            </div>

            {/* Spine */}
            <div
              className="absolute top-0 bottom-0 left-0 w-[24px] rounded-l-xs border-y-2 border-l-2 border-sky-600 flex flex-col items-center justify-between py-2 text-white overflow-hidden"
              style={{
                backgroundColor: '#075985',
                transform: 'rotateY(-90deg) translateZ(12px)',
              }}
            >
              <div className="w-2 h-0.5 bg-sky-300/40" />
              <span
                className="font-serif-title text-[8px] font-bold tracking-widest text-sky-100 uppercase"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                RUANG NOVEL
              </span>
              <div className="w-2 h-0.5 bg-sky-300/40" />
            </div>

            {/* Pages Thickness */}
            <div
              className="absolute top-1 bottom-1 right-0 w-[24px] bg-[#fbf5e6] shadow-inner border-y border-stone-300"
              style={{
                transform: 'rotateY(90deg) translateZ(132px)',
                backgroundImage:
                  'repeating-linear-gradient(to bottom, #fbf5e6, #fbf5e6 2px, #e8dfcf 2px, #e8dfcf 3px)',
              }}
            />

            {/* Back Cover */}
            <div
              className="absolute inset-0 rounded-l-md border-2 border-sky-400/60 shadow-xl p-3 flex flex-col justify-between text-center"
              style={{
                backgroundColor: '#0369a1',
                transform: 'rotateY(180deg) translateZ(12px)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="absolute inset-1 border border-sky-300/40 rounded-l pointer-events-none" />
              <div className="text-[8px] uppercase font-mono text-sky-200">
                Pintu Masuk
              </div>
              <p className="text-[9px] text-sky-100 font-sans my-auto px-1">
                "Pilih bilik sastra untuk mulai membaca."
              </p>
              <div className="text-[7px] text-sky-300/80 font-mono">
                RUANG NOVEL
              </div>
            </div>
          </div>
        </div>

        {/* Compact, Ergonomic Doorway Cards (No huge boxes) */}
        <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-left">
          {/* COMPACT DOORWAY 1: FILE BARU */}
          <div
            onClick={() => onEnter('file_baru')}
            className="group relative bg-slate-900/95 hover:bg-slate-850 border border-sky-500/50 hover:border-sky-400 rounded-xl p-3 sm:p-3.5 shadow-md hover:shadow-sky-500/20 transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 active:scale-98"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-serif-title font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                    File Baru
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-sky-950 text-sky-300 border border-sky-700 font-semibold shrink-0">
                    {fileBaruCount}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 truncate">
                  Rilisan modern &amp; webnovel
                </p>
              </div>
            </div>

            <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform shadow-xs">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* COMPACT DOORWAY 2: FILE LAMA */}
          <div
            onClick={() => onEnter('file_lama')}
            className="group relative bg-slate-900/95 hover:bg-slate-850 border border-amber-600/50 hover:border-amber-400 rounded-xl p-3 sm:p-3.5 shadow-md hover:shadow-amber-500/15 transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 active:scale-98"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-600/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                <Archive className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-serif-title font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                    File Lama
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-950 text-amber-300 border border-amber-700 font-semibold shrink-0">
                    {fileLamaCount}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 truncate">
                  Arsip sastra klasik &amp; naskah kuno
                </p>
              </div>
            </div>

            <div className="w-7 h-7 rounded-full bg-amber-700 text-white flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform shadow-xs">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Compact Secondary Options */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => onEnter('all')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Semua Novel (20)</span>
          </button>

          <button
            onClick={() => onEnter('all', 'shelf')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Rak Buku Kayu</span>
          </button>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-3 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-400">
        <div>Ruang Novel · Perpustakaan Digital</div>
        <div className="flex items-center gap-2">
          <span className="text-sky-400 font-medium">{fileBaruCount} File Baru</span>
          <span>·</span>
          <span className="text-amber-400 font-medium">{fileLamaCount} File Lama</span>
        </div>
      </footer>
    </div>
  );
};
