import React, { useState } from 'react';
import { Novel, NovelFileType } from '../types/novel';
import { Sparkles, Archive, BookOpen, Info } from 'lucide-react';

interface BookshelfViewProps {
  novels: Novel[];
  activeFileType: 'all' | NovelFileType;
  onSelectNovel: (novel: Novel) => void;
  onReadNovel: (novel: Novel) => void;
  onToggleBookmark: (novelId: string) => void;
  onMoveFileType: (novelId: string) => void;
}

export const BookshelfView: React.FC<BookshelfViewProps> = ({
  novels,
  activeFileType,
  onSelectNovel,
  onReadNovel,
  onToggleBookmark,
  onMoveFileType,
}) => {
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);

  const fileBaruNovels = novels.filter((n) => n.fileType === 'file_baru');
  const fileLamaNovels = novels.filter((n) => n.fileType === 'file_lama');

  const renderShelfRow = (
    title: string,
    subtitle: string,
    shelfNovels: Novel[],
    badgeIcon: React.ReactNode,
    badgeClasses: string
  ) => {
    return (
      <div className="mb-12">
        {/* Tidy Shelf Category Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3.5 pb-2 border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <span className={`p-1.5 rounded-lg text-xs font-semibold ${badgeClasses}`}>
              {badgeIcon}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-slate-900">
              {title}
            </h2>
            <span className="text-xs font-mono text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full font-semibold">
              {shelfNovels.length} Novel di Rak
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 sm:mt-0 font-sans">{subtitle}</p>
        </div>

        {/* The Wooden Bookshelf Structure */}
        <div className="relative bg-gradient-to-b from-[#241711] to-[#150d09] p-3 sm:p-6 pb-2 rounded-2xl shadow-xl border-4 border-[#331f16] overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_8px)] pointer-events-none" />

          {/* Shelves Container */}
          <div className="relative z-10 min-h-[280px] sm:min-h-[300px] flex items-end justify-start gap-3 sm:gap-6 px-2 sm:px-4 pb-0 overflow-x-auto no-scrollbar">
            {shelfNovels.length === 0 ? (
              <div className="w-full text-center py-16 text-sky-200/50 font-serif-title italic">
                Rak ini saat ini belum memiliki naskah.
              </div>
            ) : (
              shelfNovels.map((novel) => {
                const isHovered = hoveredBookId === novel.id;
                const spineHeight = Math.min(270, Math.max(215, 200 + (novel.pageCount / 3)));
                const spineWidth = Math.min(62, Math.max(46, 38 + (novel.pageCount / 12)));

                return (
                  <div
                    key={novel.id}
                    onMouseEnter={() => setHoveredBookId(novel.id)}
                    onMouseLeave={() => setHoveredBookId(null)}
                    className="relative flex flex-col items-center group cursor-pointer shrink-0 transition-transform duration-200"
                    style={{
                      transform: isHovered ? 'translateY(-16px) scale(1.02)' : 'translateY(0)',
                    }}
                  >
                    {/* Ribbon bookmark hanging from top */}
                    {novel.isBookmarked && (
                      <div className="absolute -top-3 left-3 w-3.5 h-6 bg-sky-500 shadow-md z-20 flex flex-col items-center justify-end">
                        <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[5px] border-b-[#241711]" />
                      </div>
                    )}

                    {/* Book Spine (Standing Book on Shelf) */}
                    <div
                      onClick={() => onSelectNovel(novel)}
                      className="relative rounded-t-sm shadow-xl flex flex-col justify-between overflow-hidden border border-black/40 transition-all select-none"
                      style={{
                        backgroundColor: novel.coverColor || '#1e293b',
                        width: `${spineWidth}px`,
                        height: `${spineHeight}px`,
                        boxShadow: isHovered
                          ? '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.4)'
                          : '4px 8px 15px rgba(0,0,0,0.6)',
                      }}
                    >
                      <div className="absolute inset-0 book-spine-shine pointer-events-none" />

                      {/* Top spine gilded lines */}
                      <div className="pt-2 px-1 text-center border-b border-sky-400/30">
                        <div className="h-0.5 bg-sky-400/40 w-full mb-0.5" />
                        <div className="h-0.5 bg-sky-400/20 w-3/4 mx-auto" />
                      </div>

                      {/* Spine Vertical Title */}
                      <div className="flex-1 flex items-center justify-center py-2 px-0.5 overflow-hidden">
                        <div
                          className="font-serif-title font-bold text-center tracking-wider text-[11px] sm:text-xs leading-tight uppercase line-clamp-3"
                          style={{
                            color: novel.spineTextColor || '#ffffff',
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                          }}
                        >
                          {novel.title}
                        </div>
                      </div>

                      {/* Bottom spine author & emblem */}
                      <div className="pb-3 px-1 text-center border-t border-sky-400/30 flex flex-col items-center">
                        <span
                          className="text-[9px] font-sans truncate w-full px-0.5"
                          style={{ color: novel.spineTextColor ? `${novel.spineTextColor}cc` : '#e2e8f0' }}
                        >
                          {novel.author.split(' ')[0]}
                        </span>
                        <div className="mt-1 w-2.5 h-2.5 rounded-full border border-sky-400/60 flex items-center justify-center text-[7px] text-sky-300">
                          ✦
                        </div>
                      </div>
                    </div>

                    {/* Book Base Shadow */}
                    <div className="w-full h-1 bg-black/60 blur-[1px] mt-0.5" />

                    {/* Tidy Hover Quick Preview Card */}
                    {isHovered && (
                      <div className="absolute bottom-[105%] left-1/2 -translate-x-1/2 z-30 w-64 bg-slate-900 text-white p-3.5 rounded-xl shadow-2xl border border-sky-500/40 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span
                            className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                              novel.fileType === 'file_baru'
                                ? 'bg-sky-950 text-sky-300 border border-sky-700'
                                : 'bg-amber-950 text-amber-300 border border-amber-700'
                            }`}
                          >
                            {novel.fileType === 'file_baru' ? 'File Baru' : 'File Lama'}
                          </span>
                          <span className="text-[11px] text-slate-400">{novel.yearPublished}</span>
                        </div>

                        <h4 className="font-serif-title font-bold text-sm text-white line-clamp-2">
                          {novel.title}
                        </h4>
                        <p className="text-xs text-slate-300 font-sans mt-0.5 mb-2">
                          oleh <span className="text-sky-300 font-medium">{novel.author}</span>
                        </p>

                        <div className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                          {novel.synopsis}
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onReadNovel(novel);
                            }}
                            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Baca</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectNovel(novel);
                            }}
                            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs cursor-pointer transition-colors"
                          >
                            <Info className="w-3.5 h-3.5" />
                            <span>Detail</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Solid Wooden Shelf Base */}
          <div className="relative -mx-6 -mb-2 mt-0">
            <div className="h-3 bg-gradient-to-r from-[#38231a] via-[#4d3024] to-[#38231a] border-t border-[#613c2c] shadow-md" />
            <div className="h-5 bg-gradient-to-r from-[#1c110c] via-[#2c1a12] to-[#1c110c] border-t border-[#3d2419] flex items-center justify-between px-6 text-[10px] text-sky-200/50 font-mono tracking-wider">
              <span>RUANG NOVEL · RAK BUKU KAYU JATI</span>
              <span>{activeFileType === 'file_baru' ? 'BILIK FILE BARU' : activeFileType === 'file_lama' ? 'BILIK FILE LAMA' : 'SEMUA BILIK'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* If activeFileType is 'file_baru', show ONLY File Baru */}
      {(activeFileType === 'file_baru' || activeFileType === 'all') && (
        renderShelfRow(
          'Rak Bilik File Baru (Karya Terkini)',
          'Koleksi webnovel kontemporer, fiksi ilmiah, dan misteri modern 2026',
          fileBaruNovels,
          <Sparkles className="w-4 h-4 text-sky-400" />,
          'bg-sky-100 text-sky-900 border border-sky-300'
        )
      )}

      {/* If activeFileType is 'file_lama', show ONLY File Lama */}
      {(activeFileType === 'file_lama' || activeFileType === 'all') && (
        renderShelfRow(
          'Rak Bilik File Lama (Arsip Klasik)',
          'Koleksi naskah klasik terarsip, roman bersejarah, dan sastra tempo doeloe',
          fileLamaNovels,
          <Archive className="w-4 h-4 text-amber-700" />,
          'bg-amber-100 text-amber-900 border border-amber-300'
        )
      )}
    </div>
  );
};
