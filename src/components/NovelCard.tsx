import React from 'react';
import { Novel } from '../types/novel';
import { BookOpen, Bookmark } from 'lucide-react';

interface NovelCardProps {
  novel: Novel;
  onSelectNovel: (novel: Novel) => void;
  onReadNovel: (novel: Novel) => void;
  onToggleBookmark: (novelId: string) => void;
  onMoveFileType: (novelId: string) => void;
}

export const NovelCard: React.FC<NovelCardProps> = ({
  novel,
  onSelectNovel,
  onReadNovel,
  onToggleBookmark,
}) => {
  return (
    <article
      onClick={() => onSelectNovel(novel)}
      className="group bg-white border border-sky-200/80 rounded-xl overflow-hidden hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Book Cover Container with 3:4 Aspect Ratio & Book Spine Crease */}
        <div className="relative aspect-[3/4] bg-slate-900 overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-1.5 sm:before:w-2 before:bg-gradient-to-r before:from-black/40 before:to-transparent before:z-10 pointer-events-none">
          {novel.coverImage ? (
            <img
              src={novel.coverImage}
              alt={`Sampul novel ${novel.title}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.cover-fallback');
                if (fallback) (fallback as HTMLElement).style.display = 'flex';
              }}
            />
          ) : null}

          {/* Styled CSS Fallback Cover for Books Without External Image */}
          <div
            className={`cover-fallback ${novel.coverImage ? 'hidden' : 'flex'} w-full h-full flex-col justify-between p-3 sm:p-4 text-center relative select-none`}
            style={{ backgroundColor: novel.coverColor || '#1e293b' }}
          >
            <div className="absolute inset-1.5 border border-sky-400/30 rounded pointer-events-none" />

            <div className="pt-1 text-center">
              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-sans text-sky-200/90 font-medium">
                {novel.yearPublished} · {novel.genre}
              </span>
            </div>

            <div className="my-auto px-1">
              <h3 className="font-serif-title font-bold text-xs sm:text-sm text-white leading-tight line-clamp-3">
                {novel.title}
              </h3>
              <p className="text-[9px] sm:text-[10px] text-sky-200 font-serif italic mt-1 truncate">
                {novel.author}
              </p>
            </div>

            <div className="pb-0.5 text-center">
              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-sky-300/80 font-mono">
                {novel.chapters.length} Bab
              </span>
            </div>
          </div>

          {/* PDF Format Badge */}
          {novel.isPdf && (
            <div className="absolute top-2 left-2 z-20 pointer-events-none">
              <span className="px-1.5 py-0.5 rounded bg-sky-950/90 text-sky-300 border border-sky-400/50 font-mono text-[9px] font-bold shadow tracking-wider">
                PDF
              </span>
            </div>
          )}

          {/* Bookmark Button Top Right */}
          <div className="absolute top-2 right-2 z-20 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(novel.id);
              }}
              aria-label={novel.isBookmarked ? 'Hapus bookmark' : 'Simpan bookmark'}
              className="p-1 sm:p-1.5 rounded-full bg-slate-900/80 text-white hover:text-sky-300 transition-colors backdrop-blur-xs shadow cursor-pointer"
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${novel.isBookmarked ? 'fill-sky-400 text-sky-400' : 'opacity-80'}`}
              />
            </button>
          </div>

          {/* Reading progress overlay at bottom of cover if active */}
          {novel.readingProgress.scrollPercent > 0 && (
            <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 backdrop-blur-xs px-2 py-1 text-white text-[9px] sm:text-[10px] z-10">
              <div className="flex justify-between items-center text-slate-300 mb-0.5 font-mono">
                <span>Bab {novel.readingProgress.currentChapterIndex + 1}</span>
                <span className="text-sky-300 font-semibold">{novel.readingProgress.scrollPercent}%</span>
              </div>
              <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-sky-400 h-full transition-all"
                  style={{ width: `${novel.readingProgress.scrollPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-2 sm:p-3">
          {/* Metadata Row */}
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 mb-0.5 font-medium truncate">
            <span className="text-sky-700 font-semibold truncate">{novel.genre}</span>
            <span aria-hidden="true">·</span>
            <span>{novel.yearPublished}</span>
          </div>

          {/* Title */}
          <h3 className="font-book-title font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
            {novel.title}
          </h3>

          {/* Author */}
          <p className="text-[10px] sm:text-[11px] text-slate-600 mt-0.5 font-sans truncate">
            Oleh <span className="font-semibold text-slate-800">{novel.author}</span>
          </p>

          {/* Synopsis preview (visible on sm+) */}
          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 leading-relaxed hidden sm:block">
            {novel.synopsis}
          </p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-2 pb-2 pt-1.5 sm:px-3 sm:pb-3 sm:pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px] sm:text-xs">
        <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
          {novel.pageCount} hlm
        </span>

        {/* Primary Read Button in Sky Blue */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReadNovel(novel);
          }}
          className="flex items-center gap-1 py-1 px-2.5 sm:px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-[10px] sm:text-xs transition-colors cursor-pointer shadow-xs active:scale-95"
        >
          <BookOpen className="w-3 h-3" />
          <span>{novel.readingProgress.scrollPercent > 0 ? 'Lanjut' : 'Baca'}</span>
        </button>
      </div>
    </article>
  );
};
