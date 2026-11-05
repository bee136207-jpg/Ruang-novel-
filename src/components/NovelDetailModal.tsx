import React from 'react';
import { Novel } from '../types/novel';
import {
  X,
  BookOpen,
  Bookmark,
  Sparkles,
  Archive,
  ArrowLeftRight,
  Trash2,
  FileText,
  Download,
} from 'lucide-react';

interface NovelDetailModalProps {
  novel: Novel | null;
  onClose: () => void;
  onReadNovel: (novel: Novel, chapterIndex?: number) => void;
  onToggleBookmark: (novelId: string) => void;
  onMoveFileType: (novelId: string) => void;
  onUpdateStatus: (novelId: string, status: Novel['status']) => void;
  onDeleteNovel: (novelId: string) => void;
}

export const NovelDetailModal: React.FC<NovelDetailModalProps> = ({
  novel,
  onClose,
  onReadNovel,
  onToggleBookmark,
  onMoveFileType,
  onUpdateStatus,
  onDeleteNovel,
}) => {
  if (!novel) return null;

  const isFileBaru = novel.fileType === 'file_baru';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-sky-900/60 text-slate-100 max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                isFileBaru
                  ? 'bg-sky-950 text-sky-200 border border-sky-700'
                  : 'bg-amber-950 text-amber-200 border border-amber-700'
              }`}
            >
              {isFileBaru ? <Sparkles className="w-3.5 h-3.5 text-sky-300" /> : <Archive className="w-3.5 h-3.5 text-amber-300" />}
              <span>{isFileBaru ? 'Kategori: File Baru (Rilisan Terkini)' : 'Kategori: File Lama (Arsip Klasik)'}</span>
            </span>
            {novel.isPdf && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-700/60">
                <FileText className="w-3 h-3 text-red-400" />
                <span>Format PDF</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(novel.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title={novel.isBookmarked ? 'Hapus bookmark' : 'Simpan bookmark'}
            >
              <Bookmark className={`w-5 h-5 ${novel.isBookmarked ? 'fill-sky-400 text-sky-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Top Section: Cover + Book Meta */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Cover Column */}
            <div className="w-36 sm:w-44 shrink-0 mx-auto sm:mx-0">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-xl border border-slate-700 bg-slate-950 relative">
                {novel.coverImage ? (
                  <img
                    src={novel.coverImage}
                    alt={novel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col justify-between p-3 text-center"
                    style={{ backgroundColor: novel.coverColor || '#1e293b' }}
                  >
                    <div className="text-[10px] uppercase font-mono text-sky-300">
                      {novel.yearPublished}
                    </div>
                    <div className="font-serif-title font-bold text-sm text-white">
                      {novel.title}
                    </div>
                    <div className="text-[9px] text-sky-200/80 font-serif">
                      {novel.author}
                    </div>
                  </div>
                )}
              </div>

              {/* Move File Button */}
              <button
                onClick={() => onMoveFileType(novel.id)}
                className="mt-3 w-full py-1.5 px-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-sky-400" />
                <span>Pindahkan ke {isFileBaru ? 'File Lama' : 'File Baru'}</span>
              </button>

              {/* View Original PDF Button if available */}
              {novel.pdfUrl && (
                <a
                  href={novel.pdfUrl}
                  download={novel.pdfFileName || `${novel.title}.pdf`}
                  className="mt-2 w-full py-1.5 px-2 bg-sky-950/80 hover:bg-sky-900 text-sky-300 hover:text-white border border-sky-700/60 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Berkas PDF Asli</span>
                </a>
              )}
            </div>

            {/* Meta Column */}
            <div className="flex-1 space-y-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-sky-400 font-sans font-semibold">
                  {novel.archiveBadge}
                </span>
                <h2 className="text-2xl font-serif-title font-bold text-white mt-1 leading-tight">
                  {novel.title}
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Penulis: <span className="font-semibold text-sky-300">{novel.author}</span>
                </p>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Genre Sastra</span>
                  <span className="text-white font-semibold">{novel.genre}</span>
                </div>
                <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Tahun Terbit / Arsip</span>
                  <span className="text-white font-semibold">{novel.yearPublished}</span>
                </div>
                <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Jumlah Bab Digital</span>
                  <span className="text-white font-semibold font-mono">{novel.chapters.length} Bab</span>
                </div>
                <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Tebal Halaman</span>
                  <span className="text-white font-semibold font-mono">{novel.pageCount} hlm</span>
                </div>
              </div>

              {/* Status Reader Switcher */}
              <div className="pt-2">
                <span className="text-xs text-slate-400 block mb-1.5 font-medium">Status Membaca:</span>
                <div className="flex items-center gap-1.5">
                  {(['Belum Dibaca', 'Sedang Dibaca', 'Selesai'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdateStatus(novel.id, st)}
                      className={`px-3 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                        novel.status === st
                          ? 'bg-sky-600 text-white border-sky-500 font-semibold shadow-xs'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div className="border-t border-slate-800 pt-4">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              Sinopsis Lengkap
            </h4>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              {novel.synopsis}
            </p>
          </div>

          {/* Chapters List */}
          <div className="border-t border-slate-800 pt-4">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center justify-between">
              <span>Daftar Bab Tersedia (Ketuk untuk Membaca)</span>
              <span className="text-sky-400 font-mono text-[11px] font-semibold">{novel.chapters.length} Bab</span>
            </h4>
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {novel.chapters.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => {
                    onClose();
                    onReadNovel(novel, idx);
                  }}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-800/70 hover:bg-sky-900/40 border border-slate-700/60 hover:border-sky-500/50 flex items-center justify-between text-xs transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="font-mono text-sky-400 font-semibold shrink-0">
                      Bab {chap.chapterNumber < 10 ? `0${chap.chapterNumber}` : chap.chapterNumber}
                    </span>
                    <span className="text-slate-200 group-hover:text-white font-medium truncate">
                      {chap.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                      {chap.wordsCount} kata
                    </span>
                    <span className="text-[11px] text-sky-400 group-hover:underline font-semibold flex items-center gap-1">
                      <span>Baca</span>
                      <BookOpen className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/95 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (confirm(`Apakah Anda yakin ingin menghapus novel "${novel.title}"?`)) {
                onDeleteNovel(novel.id);
                onClose();
              }
            }}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-rose-950/40 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Novel</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onReadNovel(novel);
              }}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-md shadow-sky-600/30 transition-all cursor-pointer active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Ruang Baca</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
