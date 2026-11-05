import React, { useState, useRef } from 'react';
import { Novel, NovelFileType } from '../types/novel';
import { parsePdfFile } from '../utils/pdfParser';
import {
  X,
  Sparkles,
  Archive,
  BookPlus,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileUp,
  PenTool,
} from 'lucide-react';

interface AddNovelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNovel: (novel: Novel) => void;
  defaultFileType?: NovelFileType;
}

const COVER_COLOR_PRESETS = [
  { label: 'Biru Langit', value: '#0369a1', textColor: '#bae6fd' },
  { label: 'Biru Samudera', value: '#0f172a', textColor: '#38bdf8' },
  { label: 'Cokelat Pusaka', value: '#3a2618', textColor: '#f6d89e' },
  { label: 'Hijau Zamrud', value: '#064e3b', textColor: '#6ee7b7' },
  { label: 'Merah Beludru', value: '#4c0519', textColor: '#fecdd3' },
];

export const AddNovelModal: React.FC<AddNovelModalProps> = ({
  isOpen,
  onClose,
  onAddNovel,
  defaultFileType = 'file_baru',
}) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'manual'>('pdf');

  // Common Form States
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [fileType, setFileType] = useState<NovelFileType>(defaultFileType);
  const [yearPublished, setYearPublished] = useState(
    defaultFileType === 'file_baru' ? '2026' : '1935'
  );
  const [genre, setGenre] = useState('Petualangan & Fiksi');
  const [selectedColor, setSelectedColor] = useState(COVER_COLOR_PRESETS[0]);
  const [synopsis, setSynopsis] = useState('');

  // PDF-Specific States
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfCoverPreview, setPdfCoverPreview] = useState<string | null>(null);
  const [extractedPdfData, setExtractedPdfData] = useState<{
    pageCount: number;
    chaptersCount: number;
    pdfDataUrl: string;
    chapters: Novel['chapters'];
  } | null>(null);

  // Manual-Specific States
  const [chapterTitle, setChapterTitle] = useState('Bab 1: Permulaan Kisah');
  const [chapterContent, setChapterContent] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setPdfError('Mohon pilih berkas berformat PDF (.pdf)');
      return;
    }

    setPdfFile(file);
    setPdfError(null);
    setIsProcessingPdf(true);

    try {
      const result = await parsePdfFile(file);
      setTitle(result.title);
      setAuthor(result.author !== 'Penulis Digital' ? result.author : '');
      setSynopsis(result.synopsis || '');
      if (result.coverImage) {
        setPdfCoverPreview(result.coverImage);
      }
      setExtractedPdfData({
        pageCount: result.pageCount,
        chaptersCount: result.chapters.length,
        pdfDataUrl: result.pdfDataUrl,
        chapters: result.chapters,
      });
    } catch (err) {
      console.error('Gagal memproses berkas PDF:', err);
      setPdfError('Gagal membaca PDF. Pastikan berkas tidak rusak atau terenkripsi.');
    } finally {
      setIsProcessingPdf(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalAuthor = author.trim() || 'Penulis Anonim';

    let finalChapters: Novel['chapters'] = [];
    let pageCount = 120;

    if (activeTab === 'pdf' && extractedPdfData) {
      finalChapters = extractedPdfData.chapters;
      pageCount = extractedPdfData.pageCount;
    } else {
      const paragraphs = chapterContent
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean);

      const fallbackContent =
        paragraphs.length > 0
          ? paragraphs
          : [
              'Halaman pertama terbuka dengan gemerisik lembut di Ruang Novel. Di sinilah kisah baru dimulai, menembus batas waktu dan ruang.',
              'Setiap bait kata yang tersurat membawa rahasia yang telah lama dinanti oleh para pembaca.',
            ];

      const wordsCount = fallbackContent.join(' ').split(/\s+/).length;
      pageCount = Math.max(120, Math.round(wordsCount / 2));
      finalChapters = [
        {
          id: `c-custom-${Date.now()}-1`,
          chapterNumber: 1,
          title: chapterTitle.trim() || 'Bab 1: Pembukaan',
          content: fallbackContent,
          wordsCount,
        },
      ];
    }

    const newNovel: Novel = {
      id: `novel-custom-${Date.now()}`,
      title: title.trim(),
      author: finalAuthor,
      fileType,
      archiveBadge:
        fileType === 'file_baru'
          ? `Rilisan Digital ${yearPublished} · File Baru`
          : `Arsip Pusaka ${yearPublished} · File Lama`,
      yearPublished: yearPublished || (fileType === 'file_baru' ? 2026 : 1945),
      genre,
      coverImage: pdfCoverPreview || '',
      coverColor: selectedColor.value,
      spineTextColor: selectedColor.textColor,
      synopsis:
        synopsis.trim() ||
        (activeTab === 'pdf'
          ? `Buku novel digital "${title.trim()}" diimpor langsung dari berkas PDF.`
          : 'Sebuah naskah baru yang tersimpan aman di perpustakaan Ruang Novel.'),
      rating: 5.0,
      pageCount,
      isBookmarked: false,
      status: 'Belum Dibaca',
      readingProgress: {
        currentChapterIndex: 0,
        scrollPercent: 0,
      },
      tags: [
        genre,
        fileType === 'file_baru' ? 'File Baru' : 'File Lama',
        activeTab === 'pdf' ? 'Format PDF' : 'Naskah Digital',
      ],
      notes: [],
      dateAdded: new Date().toISOString().split('T')[0],
      chapters: finalChapters,
      isPdf: activeTab === 'pdf',
      pdfUrl: extractedPdfData?.pdfDataUrl,
      pdfFileName: pdfFile?.name,
    };

    onAddNovel(newNovel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-sky-800/60 text-slate-100 max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <BookPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-title font-bold text-base sm:text-lg text-white leading-tight">
                Tambah Novel Baru
              </h2>
              <p className="text-[11px] text-sky-300/80">
                Mendukung Berkas PDF &amp; Pengetikan Teks Manual
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-4 pt-3 pb-0 bg-slate-850 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('pdf')}
              className={`flex items-center gap-2 py-2 px-3.5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer border-b-2 ${
                activeTab === 'pdf'
                  ? 'border-sky-400 text-sky-300 bg-slate-900 shadow-xs'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileUp className="w-3.5 h-3.5" />
              <span>Unggah Berkas PDF (Disarankan)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('manual')}
              className={`flex items-center gap-2 py-2 px-3.5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer border-b-2 ${
                activeTab === 'manual'
                  ? 'border-sky-400 text-sky-300 bg-slate-900 shadow-xs'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Input Teks Manual</span>
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          {/* TAB 1: PDF UPLOAD ZONE */}
          {activeTab === 'pdf' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />

              {/* Upload Drop Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 sm:p-6 text-center cursor-pointer transition-all ${
                  pdfFile
                    ? 'border-sky-400/80 bg-sky-950/30'
                    : 'border-slate-700 hover:border-sky-500/70 bg-slate-850 hover:bg-slate-800'
                }`}
              >
                {isProcessingPdf ? (
                  <div className="py-4 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
                    <p className="text-xs font-semibold text-white">Membaca &amp; Mengekstrak Berkas PDF...</p>
                    <p className="text-[11px] text-slate-400">
                      Mengekstrak judul, sampul halaman 1, dan bab otomatis.
                    </p>
                  </div>
                ) : pdfFile && extractedPdfData ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-left">
                    {/* Cover Preview */}
                    {pdfCoverPreview ? (
                      <div className="w-16 h-22 rounded-md overflow-hidden shadow-md border border-sky-400/40 shrink-0 bg-slate-950">
                        <img
                          src={pdfCoverPreview}
                          alt="Sampul PDF"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-22 rounded-md bg-sky-900 flex items-center justify-center text-sky-200 border border-sky-700 shrink-0">
                        <FileText className="w-8 h-8" />
                      </div>
                    )}

                    {/* PDF Meta */}
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-semibold mb-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>PDF Berhasil Diekstrak</span>
                      </div>
                      <h4 className="text-sm font-bold text-white truncate">{pdfFile.name}</h4>
                      <p className="text-xs text-sky-300 font-mono mt-0.5">
                        {extractedPdfData.pageCount} Halaman · {extractedPdfData.chaptersCount} Bab Diekstrak
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="text-[11px] text-sky-400 hover:underline mt-2 inline-block font-semibold"
                      >
                        Ganti berkas PDF lain
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-sky-950 text-sky-400 border border-sky-500/30 flex items-center justify-center">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white">
                        Klik untuk memilih berkas novel PDF (.pdf)
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Sistem akan otomatis mengekstrak halaman dan bab novel Anda
                      </p>
                    </div>
                    <span className="mt-1 text-[10px] font-mono text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800">
                      Mendukung PDF Sastra &amp; E-Book
                    </span>
                  </div>
                )}
              </div>

              {pdfError && (
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pdfError}</span>
                </div>
              )}
            </div>
          )}

          {/* BILIK FILE SELECTION: FILE BARU VS FILE LAMA */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
              Pilih Bilik Penyimpanan:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <label
                className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  fileType === 'file_baru'
                    ? 'bg-sky-950/70 border-sky-400 ring-2 ring-sky-400/40 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <input
                  type="radio"
                  name="fileType"
                  value="file_baru"
                  checked={fileType === 'file_baru'}
                  onChange={() => {
                    setFileType('file_baru');
                    if (yearPublished === '1935') setYearPublished('2026');
                  }}
                  className="mt-0.5 accent-sky-400"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>File Baru</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                    Karya digital modern &amp; rilis terkini.
                  </p>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  fileType === 'file_lama'
                    ? 'bg-slate-850 border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <input
                  type="radio"
                  name="fileType"
                  value="file_lama"
                  checked={fileType === 'file_lama'}
                  onChange={() => {
                    setFileType('file_lama');
                    if (yearPublished === '2026') setYearPublished('1935');
                  }}
                  className="mt-0.5 accent-amber-400"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Archive className="w-3.5 h-3.5 shrink-0" />
                    <span>File Lama</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                    Arsip sastra klasik &amp; karya tempo doeloe.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* NOVEL TITLE & AUTHOR INPUTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1 font-medium">Judul Novel *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="misal: Catatan Pelaut Samudera"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1 font-medium">Penulis / Pengarang</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="misal: Pramoedya Ananta Toer atau Luna Vance"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* YEAR & GENRE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs text-slate-300 block mb-1 font-medium">Tahun Terbit / Arsip</label>
              <input
                type="text"
                value={yearPublished}
                onChange={(e) => setYearPublished(e.target.value)}
                placeholder="misal: 1938 atau 2026"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1 font-medium">Genre Sastra</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="Klasik & Petualangan">Klasik &amp; Petualangan</option>
                <option value="Misteri & Detektif">Misteri &amp; Detektif</option>
                <option value="Fiksi Ilmiah & Cyber">Fiksi Ilmiah &amp; Cyber</option>
                <option value="Romansa Sastra">Romansa Sastra</option>
                <option value="Horor & Cerita Rakyat">Horor &amp; Cerita Rakyat</option>
                <option value="Drama Sejarah">Drama Sejarah</option>
                <option value="Petualangan & Fiksi">Petualangan &amp; Fiksi</option>
              </select>
            </div>
          </div>

          {/* COLOR THEME (USED WHEN NO IMAGE COVER) */}
          <div>
            <label className="text-xs text-slate-300 block mb-1.5 font-medium">
              Tema Warna Sampul (Punggung Buku di Rak)
            </label>
            <div className="flex flex-wrap gap-2">
              {COVER_COLOR_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.value}
                  onClick={() => setSelectedColor(preset)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedColor.value === preset.value
                      ? 'border-sky-400 ring-2 ring-sky-400/50 bg-slate-800'
                      : 'border-slate-700 bg-slate-850 hover:bg-slate-800'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-white/20 shadow-xs"
                    style={{ backgroundColor: preset.value }}
                  />
                  <span className="text-[11px]">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SYNOPSIS */}
          <div>
            <label className="text-xs text-slate-300 block mb-1 font-medium">Sinopsis Ringkas</label>
            <textarea
              rows={2}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Deskripsi singkat isi novel..."
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* TAB 2: MANUAL CHAPTER CONTENT */}
          {activeTab === 'manual' && (
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Naskah Bab Pertama
              </h4>
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Judul Bab 1</label>
                <input
                  type="text"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  placeholder="Bab 1: ..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  Isi Bab (Pisahkan paragraf dengan enter dua kali):
                </label>
                <textarea
                  rows={4}
                  value={chapterContent}
                  onChange={(e) => setChapterContent(e.target.value)}
                  placeholder="Ketik paragraf pembuka naskah novel Anda di sini..."
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 font-sans"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 shrink-0">
            <span className="text-[11px] text-slate-400">
              {activeTab === 'pdf' && extractedPdfData
                ? `Siap menyimpan ${extractedPdfData.chaptersCount} bab PDF`
                : 'Formulir siap disimpan'}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isProcessingPdf || !title.trim()}
                className="px-4 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:pointer-events-none text-white rounded-lg shadow-sm cursor-pointer transition-colors active:scale-95"
              >
                Simpan ke Ruang Novel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
