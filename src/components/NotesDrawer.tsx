import React from 'react';
import { Novel } from '../types/novel';
import { Bookmark, BookOpen, Quote, X } from 'lucide-react';

interface NotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  novels: Novel[];
  onOpenNovel: (novel: Novel) => void;
}

export const NotesDrawer: React.FC<NotesDrawerProps> = ({
  isOpen,
  onClose,
  novels,
  onOpenNovel,
}) => {
  if (!isOpen) return null;

  const allNotes = novels.flatMap((novel) =>
    (novel.notes || []).map((note) => ({
      ...note,
      novel,
    }))
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-slate-900 border-l border-sky-900/50 text-slate-100 w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-sky-400" />
            <h2 className="font-serif-title font-bold text-base text-white">
              Kutipan &amp; Catatan Sastra ({allNotes.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {allNotes.length === 0 ? (
            <div className="text-center py-20 text-slate-400 font-sans">
              <Quote className="w-8 h-8 mx-auto mb-2 opacity-30 text-sky-400" />
              <p className="text-sm text-slate-300 font-medium">Belum ada kutipan atau catatan tersimpan.</p>
              <p className="text-xs text-slate-500 mt-1">
                Buka salah satu novel di ruang baca lalu sorot teks atau klik ikon pena untuk mencatat.
              </p>
            </div>
          ) : (
            allNotes.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 space-y-2.5 text-xs shadow-sm hover:border-sky-500/50 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1.5 border-b border-slate-700/60">
                  <span className="font-semibold text-sky-300 truncate max-w-[200px]">
                    {item.novel.title}
                  </span>
                  <span className="font-mono">{item.createdAt}</span>
                </div>

                {item.quote && (
                  <blockquote className="font-serif italic pl-3 border-l-2 border-sky-400 text-white text-sm leading-relaxed">
                    "{item.quote}"
                  </blockquote>
                )}

                <p className="text-slate-300 font-sans">{item.text}</p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-slate-400">{item.chapterTitle}</span>
                  <button
                    onClick={() => {
                      onOpenNovel(item.novel);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-[11px] font-semibold text-sky-400 hover:text-sky-300 cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Buka Bab</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
