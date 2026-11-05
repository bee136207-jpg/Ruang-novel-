import React from 'react';
import { Sparkles, Archive, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { NovelFileType } from '../types/novel';

interface WelcomeBannerProps {
  onSelectFileType: (type: 'all' | NovelFileType) => void;
  onOpenShelf: () => void;
  fileBaruCount: number;
  fileLamaCount: number;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  onSelectFileType,
  onOpenShelf,
  fileBaruCount,
  fileLamaCount,
}) => {
  return (
    <section className="relative bg-gradient-to-r from-slate-950 via-sky-950 to-slate-950 text-white overflow-hidden border-b border-sky-800/40">
      {/* Soft atmospheric celestial glowing lights */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Welcoming Text & Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/60 border border-sky-500/40 text-sky-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>Perpustakaan Digital Dwirupa</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-book-title font-bold tracking-tight text-white leading-tight">
              Selamat Datang di{' '}
              <span className="bg-gradient-to-r from-sky-400 via-sky-200 to-sky-400 bg-clip-text text-transparent underline decoration-sky-500/40 decoration-wavy decoration-2">
                Ruang Novel
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-sans leading-relaxed mx-auto lg:mx-0">
              Gerbang perpustakaan digital interaktif dengan dua bilik utama yang tertata rapi: nikmati{' '}
              <strong className="text-sky-300 font-semibold">{fileBaruCount} karya modern di File Baru</strong> dan selami{' '}
              <strong className="text-amber-200 font-semibold">{fileLamaCount} mahakarya sastra klasik di File Lama</strong>.
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => onSelectFileType('file_baru')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-sky-600/30 transition-all cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-sky-200" />
                <span>Bilik File Baru ({fileBaruCount})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSelectFileType('file_lama')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-amber-200 border border-amber-600/50 font-semibold text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
              >
                <Archive className="w-4 h-4 text-amber-400" />
                <span>Bilik File Lama ({fileLamaCount})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenShelf}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700 text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Buka Rak Buku Kayu</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 3D Rotating Book Animation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="perspective-1000 w-64 h-80 flex items-center justify-center relative">
              {/* Outer soft sky-blue glow behind book */}
              <div className="absolute w-56 h-64 bg-sky-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />

              {/* The 3D Rotating Book Container */}
              <div
                className="animate-spin-book relative w-48 h-64 cursor-grab select-none transition-transform"
                title="Buku 3D Ruang Novel (Sorot kursor untuk menghentikan putaran)"
              >
                {/* Front Cover */}
                <div
                  className="absolute inset-0 rounded-r-md border-2 border-sky-400/50 shadow-2xl overflow-hidden flex flex-col justify-between p-4 text-center"
                  style={{
                    backgroundColor: '#0369a1',
                    transform: 'translateZ(14px)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Subtle leather texture & gold frame */}
                  <div className="absolute inset-1.5 border border-sky-300/40 rounded-r pointer-events-none" />
                  <div className="absolute inset-2 border border-dashed border-sky-300/20 rounded-r pointer-events-none" />

                  {/* Top emblem */}
                  <div className="pt-2">
                    <span className="text-[10px] tracking-widest uppercase font-serif text-sky-200">
                      Perpustakaan Sastra
                    </span>
                  </div>

                  {/* Center Book Title */}
                  <div className="my-auto px-1">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-full border border-sky-200/50 flex items-center justify-center text-sky-200 text-xs">
                      ❖
                    </div>
                    <h2 className="font-serif-title font-bold text-lg text-white tracking-wider uppercase leading-snug">
                      Ruang Novel
                    </h2>
                    <p className="text-[11px] text-sky-100 font-serif italic mt-1">
                      Koleksi 20 Naskah Pilihan
                    </p>
                  </div>

                  {/* Bottom seal */}
                  <div className="pb-1 text-[9px] uppercase tracking-wider text-sky-300 font-mono">
                    10 File Baru · 10 File Lama
                  </div>
                </div>

                {/* Book Spine (Left Side) */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-[28px] rounded-l-xs border-y-2 border-l-2 border-sky-600 shadow-inner flex flex-col items-center justify-between py-3 text-white overflow-hidden"
                  style={{
                    backgroundColor: '#075985',
                    transform: 'rotateY(-90deg) translateZ(14px)',
                  }}
                >
                  <div className="w-2.5 h-0.5 bg-sky-300/40" />
                  <span
                    className="font-serif-title text-[10px] font-bold tracking-widest text-sky-100 uppercase"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    RUANG NOVEL
                  </span>
                  <div className="w-2.5 h-0.5 bg-sky-300/40" />
                </div>

                {/* Book Right Side Edge (Pages thickness) */}
                <div
                  className="absolute top-1 bottom-1 right-0 w-[28px] bg-[#fbf5e6] shadow-inner border-y border-stone-300"
                  style={{
                    transform: 'rotateY(90deg) translateZ(178px)',
                    backgroundImage: 'repeating-linear-gradient(to bottom, #fbf5e6, #fbf5e6 2px, #e8dfcf 2px, #e8dfcf 3px)',
                  }}
                />

                {/* Back Cover */}
                <div
                  className="absolute inset-0 rounded-l-md border-2 border-sky-400/50 shadow-2xl p-4 flex flex-col justify-between text-center"
                  style={{
                    backgroundColor: '#0369a1',
                    transform: 'rotateY(180deg) translateZ(14px)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="absolute inset-1.5 border border-sky-300/40 rounded-l pointer-events-none" />
                  <div className="text-[9px] uppercase font-mono text-sky-200 pt-2">
                    Koleksi Digital
                  </div>
                  <div className="my-auto px-2">
                    <p className="text-[11px] text-sky-100 font-sans leading-relaxed">
                      "Sebuah buku adalah jendela yang melampaui masa silam dan masa depan."
                    </p>
                  </div>
                  <div className="text-[9px] text-sky-300/80 font-mono pb-1">
                    EDISI DWIRUPA 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Hint label */}
            <p className="text-[11px] text-sky-300/70 font-sans mt-2 text-center flex items-center gap-1">
              <span>✦ Sorot kursor ke buku untuk menghentikan putaran</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
