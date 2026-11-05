import React, { useState, useEffect, useRef } from 'react';
import { Novel, Chapter, ReaderSettings, ReaderTheme, ReaderFont, NovelNote } from '../types/novel';
import {
  ArrowLeft,
  List,
  Settings,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Type,
  Maximize2,
  Minimize2,
  PenTool,
  Check,
} from 'lucide-react';

interface ReaderViewProps {
  novel: Novel;
  initialChapterIndex?: number;
  onBack: () => void;
  onUpdateProgress: (novelId: string, chapterIndex: number, scrollPercent: number) => void;
  onAddNote: (novelId: string, note: Omit<NovelNote, 'id' | 'createdAt'>) => void;
  onToggleBookmark: (novelId: string) => void;
}

const DEFAULT_SETTINGS: ReaderSettings = {
  theme: 'sky',
  fontFamily: 'cormorant',
  fontSize: 18,
  lineHeight: 1.8,
  maxWidth: 720,
  textAlign: 'left',
};

export const ReaderView: React.FC<ReaderViewProps> = ({
  novel,
  initialChapterIndex,
  onBack,
  onUpdateProgress,
  onAddNote,
  onToggleBookmark,
}) => {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(
    initialChapterIndex !== undefined
      ? initialChapterIndex
      : (novel.readingProgress.currentChapterIndex || 0)
  );
  const [settings, setSettings] = useState<ReaderSettings>(() => {
    const saved = localStorage.getItem('ruang_novel_reader_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedTextQuote, setSelectedTextQuote] = useState('');
  const [userNoteInput, setUserNoteInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Text-to-speech state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentChapter: Chapter = novel.chapters[currentChapterIdx] || novel.chapters[0];

  useEffect(() => {
    localStorage.setItem('ruang_novel_reader_settings', JSON.stringify(settings));
  }, [settings]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(
          100,
          Math.max(0, Math.round((window.scrollY / totalHeight) * 100))
        );
        setScrollProgress(currentProgress);
        onUpdateProgress(novel.id, currentChapterIdx, currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [novel.id, currentChapterIdx, onUpdateProgress]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    stopSpeech();
  }, [currentChapterIdx]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopSpeech();
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!synthRef.current) return;

    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    synthRef.current.cancel();
    const fullText = `${currentChapter.title}. ${currentChapter.content.join(' ')}`;
    const utterance = new SpeechSynthesisUtterance(fullText);

    const voices = synthRef.current.getVoices();
    const idVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('ID'));
    if (idVoice) utterance.voice = idVoice;
    utterance.lang = 'id-ID';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 3) {
      setSelectedTextQuote(selection.toString().trim());
    }
  };

  const handleSaveNote = () => {
    if (!userNoteInput.trim() && !selectedTextQuote.trim()) return;

    onAddNote(novel.id, {
      chapterIndex: currentChapterIdx,
      chapterTitle: currentChapter.title,
      text: userNoteInput.trim() || 'Kutipan tersimpan',
      quote: selectedTextQuote || undefined,
    });

    setUserNoteInput('');
    setSelectedTextQuote('');
    setShowNoteModal(false);
  };

  // Theme styling map
  const getThemeClasses = (t: ReaderTheme) => {
    switch (t) {
      case 'sky':
        return {
          wrapper: 'bg-[#f0f7ff] text-[#0f172a]',
          header: 'bg-[#e0f2fe]/95 border-[#bae6fd] text-[#0369a1]',
          footer: 'bg-[#e0f2fe] border-[#bae6fd]',
          accent: 'text-sky-600',
          dropCap: 'text-sky-700',
        };
      case 'sepia':
        return {
          wrapper: 'bg-[#fbf7ed] text-[#2c221e]',
          header: 'bg-[#f4eedb]/95 border-[#e5dac0] text-[#3a2e28]',
          footer: 'bg-[#f4eedb] border-[#e5dac0]',
          accent: 'text-amber-800',
          dropCap: 'text-amber-900',
        };
      case 'dark':
        return {
          wrapper: 'bg-[#0f172a] text-[#e2e8f0]',
          header: 'bg-[#1e293b]/95 border-[#334155] text-[#f8fafc]',
          footer: 'bg-[#1e293b] border-[#334155]',
          accent: 'text-sky-400',
          dropCap: 'text-sky-400',
        };
      case 'mint':
        return {
          wrapper: 'bg-[#edf3ee] text-[#1c2c20]',
          header: 'bg-[#e2ebe4]/95 border-[#cad8cc] text-[#1e3423]',
          footer: 'bg-[#e2ebe4] border-[#cad8cc]',
          accent: 'text-emerald-800',
          dropCap: 'text-emerald-900',
        };
      case 'light':
      default:
        return {
          wrapper: 'bg-[#ffffff] text-[#1e293b]',
          header: 'bg-white/95 border-slate-200 text-slate-900',
          footer: 'bg-white border-slate-200',
          accent: 'text-sky-600',
          dropCap: 'text-slate-900',
        };
    }
  };

  const currentTheme = getThemeClasses(settings.theme);

  const getFontClass = (f: ReaderFont) => {
    switch (f) {
      case 'cormorant':
        return 'font-reader-garamond';
      case 'lora':
        return 'font-reader-lora';
      case 'sans':
        return 'font-reader-sans';
      default:
        return 'font-reader-garamond';
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseUp={handleTextSelection}
      className={`min-h-screen w-full max-w-full overflow-x-hidden transition-colors duration-200 ${currentTheme.wrapper} flex flex-col`}
    >
      {/* Sticky Reader Top Bar */}
      <header
        className={`sticky top-0 z-40 w-full max-w-full backdrop-blur-md border-b transition-colors ${currentTheme.header}`}
      >
        <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 h-13 sm:h-14 flex items-center justify-between gap-1.5 sm:gap-3 overflow-hidden">
          {/* Back button & Novel Info */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1">
            <button
              onClick={() => {
                stopSpeech();
                onBack();
              }}
              className="flex items-center gap-1 py-1.5 px-2 rounded-lg hover:bg-sky-500/10 text-xs font-semibold cursor-pointer transition-colors shrink-0"
              title="Kembali ke Perpustakaan"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden md:inline">Ruang Novel</span>
            </button>

            {/* Novel Info (Clickable to open chapter list) */}
            <button
              onClick={() => setShowChapterList(!showChapterList)}
              className="border-l border-sky-300/40 pl-2 sm:pl-3 text-left cursor-pointer group min-w-0 flex-1 truncate"
              title="Buka daftar bab novel"
            >
              <h2 className="text-xs sm:text-sm font-bold truncate group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                {novel.title}
              </h2>
              <p className="text-[10px] opacity-80 truncate flex items-center gap-1">
                <span className="font-semibold text-sky-600 dark:text-sky-400 shrink-0">
                  Bab {currentChapterIdx + 1}/{novel.chapters.length}:
                </span>
                <span className="truncate">{currentChapter.title}</span>
              </p>
            </button>
          </div>

          {/* Reader Controls Toolbar (Compact & Touch-Friendly on Mobile) */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0">
            {/* Audio Reader Text-to-Speech */}
            <button
              onClick={handleToggleSpeech}
              title={isSpeaking ? 'Hentikan Bacakan' : 'Bacakan Bab Ini (Audio TTS)'}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
                isSpeaking
                  ? 'bg-sky-600 text-white animate-pulse'
                  : 'hover:bg-sky-500/15 opacity-80 hover:opacity-100'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Note button */}
            <button
              onClick={() => setShowNoteModal(true)}
              title="Catat Kutipan / Catatan Bab"
              className="p-1.5 sm:p-2 rounded-lg hover:bg-sky-500/15 opacity-80 hover:opacity-100 transition-colors cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
            </button>

            {/* Chapter List Toggle */}
            <button
              onClick={() => setShowChapterList(!showChapterList)}
              title="Daftar Bab"
              className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
                showChapterList
                  ? 'bg-sky-600 text-white'
                  : 'hover:bg-sky-500/15 opacity-80 hover:opacity-100'
              }`}
            >
              <List className="w-4 h-4" />
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(novel.id)}
              title={novel.isBookmarked ? 'Hapus Bookmark' : 'Tandai Buku Ini'}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-sky-500/15 transition-colors cursor-pointer"
            >
              <Bookmark
                className={`w-4 h-4 ${novel.isBookmarked ? 'fill-sky-500 text-sky-500' : 'opacity-80'}`}
              />
            </button>

            {/* Settings button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              title="Setelan Membaca"
              className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
                showSettings
                  ? 'bg-sky-600 text-white'
                  : 'hover:bg-sky-500/15 opacity-80 hover:opacity-100'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Fullscreen toggle (Desktop only) */}
            <button
              onClick={toggleFullscreen}
              title="Layar Penuh"
              className="hidden md:block p-2 rounded-lg hover:bg-sky-500/15 opacity-80 hover:opacity-100 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Sky Blue Reading Progress Indicator */}
        <div className="w-full bg-sky-200/40 h-1">
          <div
            className="h-full bg-sky-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Reader Layout Container */}
      <div className="flex-1 relative flex">
        {/* Chapter List Drawer with Backdrop for Mobile */}
        {showChapterList && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
              onClick={() => setShowChapterList(false)}
            />
            <aside className="fixed inset-y-0 left-0 w-[85vw] sm:w-80 max-w-xs bg-slate-900 text-slate-100 shadow-2xl z-50 p-4 sm:p-5 flex flex-col border-r border-slate-800 animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 pt-2">
                <span className="font-serif-title font-bold text-sm text-sky-300">
                  Daftar Bab ({novel.chapters.length})
                </span>
                <button
                  onClick={() => setShowChapterList(false)}
                  className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md cursor-pointer"
                >
                  Tutup ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                {novel.chapters.map((chap, idx) => {
                  const isActive = idx === currentChapterIdx;
                  return (
                    <button
                      key={chap.id}
                      onClick={() => {
                        setCurrentChapterIdx(idx);
                        setShowChapterList(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${
                        isActive
                          ? 'bg-sky-600 text-white font-medium shadow-xs'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-mono opacity-70 shrink-0 font-bold">
                        {chap.chapterNumber < 10 ? `0${chap.chapterNumber}` : chap.chapterNumber}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="line-clamp-2">{chap.title}</div>
                        <div className="text-[10px] opacity-75 mt-1 flex items-center gap-2">
                          <span>{chap.wordsCount} kata</span>
                          {isActive && <span className="font-bold text-sky-200">· Sedang Dibaca</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>
          </>
        )}

        {/* Reader Settings Floating Panel (Responsive on Mobile) */}
        {showSettings && (
          <div className="fixed top-14 sm:top-16 right-2 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-80 max-w-sm bg-slate-900 text-slate-100 p-4 sm:p-5 rounded-2xl shadow-2xl border border-sky-500/30 animate-in fade-in duration-150 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs uppercase font-sans tracking-wider text-sky-400 font-bold">
                Setelan Tampilan Baca
              </span>
              <button
                onClick={() => setShowSettings(false)}
                className="text-xs p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Theme Selector */}
            <div className="mb-4">
              <label className="text-xs text-slate-400 block mb-2 font-medium">Tema Warna</label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: 'sky', label: 'Langit', bg: 'bg-[#f0f7ff]', text: 'text-[#0369a1]' },
                  { id: 'sepia', label: 'Sepia', bg: 'bg-[#fbf7ed]', text: 'text-[#2c221e]' },
                  { id: 'light', label: 'Putih', bg: 'bg-white', text: 'text-black' },
                  { id: 'mint', label: 'Mint', bg: 'bg-[#edf3ee]', text: 'text-[#1c2c20]' },
                  { id: 'dark', label: 'Gelap', bg: 'bg-[#0f172a]', text: 'text-[#f8fafc]' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setSettings({ ...settings, theme: th.id as ReaderTheme })}
                    className={`py-2 rounded-lg text-center border text-[11px] font-semibold cursor-pointer transition-all ${
                      th.bg
                    } ${th.text} ${
                      settings.theme === th.id
                        ? 'ring-2 ring-sky-400 border-transparent shadow'
                        : 'border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family Selector */}
            <div className="mb-4">
              <label className="text-xs text-slate-400 block mb-2 font-medium">Pilihan Huruf</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cormorant', label: 'Garamond' },
                  { id: 'lora', label: 'Lora' },
                  { id: 'sans', label: 'Modern' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSettings({ ...settings, fontFamily: f.id as ReaderFont })}
                    className={`py-1.5 rounded-lg border text-xs text-center cursor-pointer transition-colors ${
                      settings.fontFamily === f.id
                        ? 'bg-sky-600 text-white border-sky-500 font-semibold'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <div>{f.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size Slider */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>Ukuran Huruf</span>
                <span className="font-mono text-sky-400 font-semibold">{settings.fontSize}px</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs">A-</span>
                <input
                  type="range"
                  min="16"
                  max="28"
                  step="1"
                  value={settings.fontSize}
                  onChange={(e) =>
                    setSettings({ ...settings, fontSize: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <span className="text-base font-bold">A+</span>
              </div>
            </div>

            {/* Line Height Slider */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>Jarak Baris</span>
                <span className="font-mono text-sky-400 font-semibold">{settings.lineHeight.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="1.4"
                max="2.4"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) =>
                  setSettings({ ...settings, lineHeight: parseFloat(e.target.value) })
                }
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Column Width */}
            <div>
              <label className="text-xs text-slate-400 block mb-2 font-medium">Lebar Kolom</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { width: 620, label: 'Ketat' },
                  { width: 740, label: 'Standar' },
                  { width: 900, label: 'Lebar' },
                ].map((w) => (
                  <button
                    key={w.width}
                    onClick={() => setSettings({ ...settings, maxWidth: w.width })}
                    className={`py-1.5 text-xs rounded-lg border cursor-pointer font-medium ${
                      settings.maxWidth === w.width
                        ? 'bg-sky-600 text-white border-sky-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Reading Essay Canvas (Responsive & Fits Phone Screen Snugly) */}
        <main className="flex-1 w-full max-w-full py-6 sm:py-14 px-3.5 sm:px-8 flex flex-col items-center overflow-x-hidden">
          <article
            className="w-full max-w-full transition-all duration-200"
            style={{ maxWidth: `${settings.maxWidth}px` }}
          >
            {/* Novel Archival Kicker */}
            <div className="text-center pb-5 sm:pb-6 mb-6 sm:mb-8 border-b border-black/10 dark:border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs tracking-wider uppercase opacity-65 mb-2 font-medium">
                <span>{novel.fileType === 'file_baru' ? 'Bilik File Baru' : 'Bilik File Lama'}</span>
                <span>·</span>
                <span className="truncate max-w-[200px] sm:max-w-none">{novel.archiveBadge}</span>
              </div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif-title font-bold tracking-tight break-words px-2 text-center">
                {currentChapter.title}
              </h1>
              <div className="mt-2.5 text-[11px] sm:text-xs opacity-75 font-serif italic text-center">
                Oleh {novel.author} · {currentChapter.wordsCount} kata
              </div>
            </div>

            {/* Chapter Body Content with safe responsive typography & hyphens */}
            <div
              className={`space-y-4 sm:space-y-6 ${getFontClass(settings.fontFamily)} break-words`}
              style={{
                fontSize: `clamp(16px, 4.2vw, ${settings.fontSize}px)`,
                lineHeight: settings.lineHeight,
                textAlign: settings.textAlign === 'justify' ? 'justify' : 'left',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto',
              }}
            >
              {currentChapter.content.map((paragraph, pIdx) => {
                if (pIdx === 0) {
                  return (
                    <p
                      key={pIdx}
                      className={`leading-relaxed first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 sm:first-letter:mr-3 first-letter:mt-0.5 sm:first-letter:mt-1 first-letter:leading-none ${currentTheme.dropCap}`}
                    >
                      {paragraph}
                    </p>
                  );
                }
                return (
                  <p key={pIdx} className="leading-relaxed indent-4 sm:indent-8">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Decorative End Mark */}
            <div className="py-8 sm:py-12 text-center text-sky-600/70 select-none">
              <span className="font-serif text-base sm:text-lg tracking-widest">❖ ❖ ❖</span>
            </div>

            {/* Chapter Navigation Buttons (Fully Mobile-Adaptive) */}
            <div className="pt-6 sm:pt-8 border-t border-black/10 dark:border-white/10 w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 w-full">
                {/* Previous Chapter Button */}
                <button
                  disabled={currentChapterIdx === 0}
                  onClick={() => {
                    const newIdx = Math.max(0, currentChapterIdx - 1);
                    setCurrentChapterIdx(newIdx);
                    onUpdateProgress(novel.id, newIdx, 0);
                  }}
                  className="flex-1 flex items-center justify-start gap-2.5 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border border-sky-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 hover:bg-sky-50 dark:hover:bg-slate-750 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer group text-left shadow-xs min-w-0"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
                  <div className="min-w-0 flex-1 truncate">
                    <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Bab Sebelumnya
                    </div>
                    {currentChapterIdx > 0 ? (
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                        Bab {novel.chapters[currentChapterIdx - 1].chapterNumber}: {novel.chapters[currentChapterIdx - 1].title}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 italic">Sudah di Bab Pertama</div>
                    )}
                  </div>
                </button>

                {/* Chapter Counter & Quick Drawer Trigger */}
                <button
                  onClick={() => setShowChapterList(true)}
                  title="Buka daftar bab lengkap"
                  className="py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-sky-100/80 dark:bg-slate-800 border border-sky-300/70 dark:border-slate-700 text-center cursor-pointer hover:bg-sky-200/80 transition-colors shrink-0"
                >
                  <div className="text-xs font-bold font-mono text-sky-900 dark:text-sky-300 flex items-center justify-center gap-1.5">
                    <List className="w-3.5 h-3.5" />
                    <span>Bab {currentChapterIdx + 1} dari {novel.chapters.length}</span>
                  </div>
                  <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">
                    Ketuk untuk pilih bab
                  </div>
                </button>

                {/* Next Chapter Button */}
                <button
                  disabled={currentChapterIdx === novel.chapters.length - 1}
                  onClick={() => {
                    const newIdx = Math.min(novel.chapters.length - 1, currentChapterIdx + 1);
                    setCurrentChapterIdx(newIdx);
                    onUpdateProgress(novel.id, newIdx, 0);
                  }}
                  className="flex-1 flex items-center justify-end gap-2.5 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-md group text-right min-w-0"
                >
                  <div className="min-w-0 flex-1 truncate text-right">
                    <div className="text-[10px] font-semibold text-sky-200 uppercase tracking-wider">
                      Bab Selanjutnya
                    </div>
                    {currentChapterIdx < novel.chapters.length - 1 ? (
                      <div className="text-xs font-bold text-white truncate">
                        Bab {novel.chapters[currentChapterIdx + 1].chapterNumber}: {novel.chapters[currentChapterIdx + 1].title}
                      </div>
                    ) : (
                      <div className="text-xs text-sky-200 italic">Tamat (Bab Terakhir)</div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              </div>
            </div>

            {/* Saved Notes in this chapter */}
            {novel.notes && novel.notes.length > 0 && (
              <div className="mt-14 pt-8 border-t border-black/10 dark:border-white/10">
                <h3 className="text-xs uppercase tracking-wider font-sans font-bold opacity-80 mb-3 flex items-center gap-2 text-sky-700 dark:text-sky-400">
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Catatan &amp; Kutipan Tersimpan di Novel Ini</span>
                </h3>
                <div className="space-y-3">
                  {novel.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-sky-200 dark:border-slate-700 text-xs shadow-xs"
                    >
                      {note.quote && (
                        <blockquote className="font-serif italic pl-3 border-l-2 border-sky-500 mb-2 opacity-90 text-sm">
                          "{note.quote}"
                        </blockquote>
                      )}
                      <p className="font-sans">{note.text}</p>
                      <div className="mt-2 text-[10px] opacity-60 flex items-center justify-between">
                        <span>{note.chapterTitle}</span>
                        <span>{note.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 text-slate-100 max-w-lg w-full p-4 sm:p-6 rounded-2xl shadow-2xl border border-sky-500/40 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif-title font-bold text-lg text-white mb-1">
              Tambah Catatan / Kutipan
            </h3>
            <p className="text-xs text-sky-300 mb-4 font-sans">
              Bab {currentChapter.chapterNumber}: {currentChapter.title}
            </p>

            {selectedTextQuote && (
              <div className="mb-4 p-3 bg-slate-800 rounded-lg border-l-2 border-sky-400 text-xs font-serif italic text-sky-100">
                "{selectedTextQuote}"
              </div>
            )}

            <div className="mb-4">
              <label className="text-xs text-slate-300 block mb-1.5 font-medium">
                Catatan Pribadi atau Refleksi:
              </label>
              <textarea
                rows={4}
                value={userNoteInput}
                onChange={(e) => setUserNoteInput(e.target.value)}
                placeholder="Tuliskan pemikiran atau impresi Anda tentang adegan ini..."
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedTextQuote('');
                  setShowNoteModal(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white cursor-pointer shadow-sm"
              >
                Simpan Catatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
