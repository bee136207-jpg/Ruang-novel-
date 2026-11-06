import React, { useState, useEffect, useMemo } from 'react';
import { Novel, NovelFileType, NovelNote } from './types/novel';
import { INITIAL_NOVELS } from './data/defaultNovels';
import { EntranceScreen } from './components/EntranceScreen';
import { Navbar } from './components/Navbar';
import { LibraryHero } from './components/LibraryHero';
import { BookshelfView } from './components/BookshelfView';
import { NovelCard } from './components/NovelCard';
import { ReaderView } from './components/ReaderView';
import { NovelDetailModal } from './components/NovelDetailModal';
import { AddNovelModal } from './components/AddNovelModal';
import { LibraryStatsModal } from './components/LibraryStatsModal';
import { NotesDrawer } from './components/NotesDrawer';
import { SupabaseSyncModal } from './components/SupabaseSyncModal';
import {
  supabase,
  checkSupabaseHealth,
  fetchNovelsFromSupabase,
  upsertNovelToSupabase,
  seedNovelsToSupabase,
  deleteNovelFromSupabase,
  updateNovelFieldsInSupabase,
  SupabaseHealth,
} from './lib/supabase';
import {
  FilterX,
  Clock,
  CheckCircle2,
  BookMarked,
  ArrowLeft,
  Database,
} from 'lucide-react';

export default function App() {
  // Navigation Screen State: 'entrance' (Layar Masuk) vs 'app' (Dalam Bilik Terpilih)
  const [currentScreen, setCurrentScreen] = useState<'entrance' | 'app'>('entrance');

  // State for all novels in Ruang Novel with smart chapter hydration
  const [novels, setNovels] = useState<Novel[]>(() => {
    try {
      const saved =
        localStorage.getItem('ruang_novel_collection_v3') ||
        localStorage.getItem('ruang_novel_collection_v2') ||
        localStorage.getItem('ruang_novel_collection');
      if (saved) {
        const parsed: Novel[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 20) {
          // Merge chapters from INITIAL_NOVELS so every book has all chapters available
          const updated = parsed.map((item) => {
            const defaultMatch = INITIAL_NOVELS.find((d) => d.id === item.id);
            if (defaultMatch && (!item.chapters || item.chapters.length < defaultMatch.chapters.length)) {
              return {
                ...item,
                chapters: defaultMatch.chapters,
              };
            }
            return item;
          });
          return updated;
        }
      }
    } catch (e) {
      console.error('Gagal memuat novel tersimpan', e);
    }
    return INITIAL_NOVELS;
  });

  // Selected Compartment: 'file_baru' or 'file_lama'
  const [activeFileType, setActiveFileType] = useState<'all' | NovelFileType>('file_baru');
  const [viewMode, setViewMode] = useState<'grid' | 'shelf'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [filterReadStatus, setFilterReadStatus] = useState<'all' | Novel['status']>('all');

  // Modals & Active View states
  const [readingNovelId, setReadingNovelId] = useState<string | null>(null);
  const [readingChapterIdx, setReadingChapterIdx] = useState<number | undefined>(undefined);
  const [selectedNovelId, setSelectedNovelId] = useState<string | null>(null);

  const handleOpenReader = (novelId: string, chapterIdx?: number) => {
    setReadingNovelId(novelId);
    setReadingChapterIdx(chapterIdx);
  };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Supabase Database States
  const [supabaseHealth, setSupabaseHealth] = useState<SupabaseHealth>({
    isConnected: false,
    tableExists: false,
    message: 'Memeriksa koneksi Supabase...',
  });
  const [isCheckingSupabase, setIsCheckingSupabase] = useState(false);
  const [isSyncingSupabase, setIsSyncingSupabase] = useState(false);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Check Supabase health & load novels on startup
  const checkAndLoadSupabase = async (isManualCheck = false) => {
    setIsCheckingSupabase(true);
    try {
      const health = await checkSupabaseHealth();
      setSupabaseHealth(health);

      if (health.tableExists) {
        try {
          const cloudNovels = await fetchNovelsFromSupabase();
          if (cloudNovels && cloudNovels.length > 0) {
            setNovels(cloudNovels);
            if (isManualCheck) {
              showToast(`Berhasil memuat ${cloudNovels.length} novel dari database Supabase!`);
            }
          } else {
            // Table is ready but empty: seed the 20 default novels to Postgres
            await seedNovelsToSupabase(INITIAL_NOVELS);
            setNovels(INITIAL_NOVELS);
            showToast('20 novel naskah standar berhasil disinkronkan ke Supabase!');
          }
        } catch (fetchErr: any) {
          console.error('Gagal mengambil naskah dari Supabase:', fetchErr);
        }
      } else if (isManualCheck) {
        showToast(health.message);
      }
    } catch (err: any) {
      console.error('Error saat koneksi Supabase:', err);
    } finally {
      setIsCheckingSupabase(false);
    }
  };

  useEffect(() => {
    checkAndLoadSupabase();
  }, []);

  // Realtime Supabase Channel: Sync changes instantly across tabs and devices
  useEffect(() => {
    if (!supabaseHealth.tableExists) return;

    const channel = supabase
      .channel('realtime_novels_shelf')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'novels' },
        async () => {
          try {
            const fresh = await fetchNovelsFromSupabase();
            if (fresh && fresh.length > 0) {
              setNovels(fresh);
            }
          } catch (e) {
            console.error('Realtime sync error:', e);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabaseHealth.tableExists]);

  // Sync active local novels to Supabase manually
  const handleSyncLocalToCloud = async () => {
    if (!supabaseHealth.tableExists) {
      showToast('Tabel "novels" belum dibuat di Supabase.');
      setIsSupabaseModalOpen(true);
      return;
    }
    setIsSyncingSupabase(true);
    try {
      await seedNovelsToSupabase(novels);
      showToast(`Berhasil menyinkronkan ${novels.length} novel ke database Supabase!`);
    } catch (err: any) {
      console.error('Gagal sinkron:', err);
      showToast(`Gagal sinkron: ${err.message}`);
    } finally {
      setIsSyncingSupabase(false);
    }
  };

  // Persist novels to localStorage as local offline backup
  useEffect(() => {
    try {
      localStorage.setItem('ruang_novel_collection_v3', JSON.stringify(novels));
    } catch (e) {
      console.error('Gagal menyimpan novel', e);
    }
  }, [novels]);

  // Derived counts
  const fileBaruCount = useMemo(
    () => novels.filter((n) => n.fileType === 'file_baru').length,
    [novels]
  );
  const fileLamaCount = useMemo(
    () => novels.filter((n) => n.fileType === 'file_lama').length,
    [novels]
  );

  // Available unique genres for the currently active file compartment
  const genres = useMemo(() => {
    const relevantNovels =
      activeFileType === 'all'
        ? novels
        : novels.filter((n) => n.fileType === activeFileType);
    const set = new Set(relevantNovels.map((n) => n.genre));
    return Array.from(set).sort();
  }, [novels, activeFileType]);

  // Handler to enter from Entrance Screen into the selected room
  const handleEnterApp = (fileType: NovelFileType | 'all', initialViewMode: 'grid' | 'shelf' = 'grid') => {
    setActiveFileType(fileType);
    setViewMode(initialViewMode);
    setCurrentScreen('app');
    setSearchQuery('');
    setSelectedGenre('all');
    setFilterReadStatus('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle bookmark
  const handleToggleBookmark = (novelId: string) => {
    const target = novels.find((n) => n.id === novelId);
    if (!target) return;
    const nextState = !target.isBookmarked;

    setNovels((prev) =>
      prev.map((n) => (n.id === novelId ? { ...n, isBookmarked: nextState } : n))
    );
    showToast(
      nextState
        ? `Ditambahkan ke daftar tanda baca.`
        : `Dihapus dari tanda baca.`
    );

    if (supabaseHealth.tableExists) {
      updateNovelFieldsInSupabase(novelId, { is_bookmarked: nextState }).catch((err) =>
        console.error('Gagal sync bookmark ke Supabase:', err)
      );
    }
  };

  // Move novel between File Baru and File Lama
  const handleMoveFileType = (novelId: string) => {
    const target = novels.find((n) => n.id === novelId);
    if (!target) return;
    const newType: NovelFileType =
      target.fileType === 'file_baru' ? 'file_lama' : 'file_baru';
    const targetLabel = newType === 'file_baru' ? 'File Baru' : 'File Lama';

    setNovels((prev) =>
      prev.map((novel) => {
        if (novel.id !== novelId) return novel;
        return {
          ...novel,
          fileType: newType,
        };
      })
    );
    showToast(`Novel "${target.title}" dipindahkan ke ${targetLabel}.`);

    if (supabaseHealth.tableExists) {
      updateNovelFieldsInSupabase(novelId, { file_type: newType }).catch((err) =>
        console.error('Gagal sync pindah bilik ke Supabase:', err)
      );
    }
  };

  // Update read status
  const handleUpdateStatus = (novelId: string, status: Novel['status']) => {
    setNovels((prev) =>
      prev.map((n) => (n.id === novelId ? { ...n, status } : n))
    );
    showToast(`Status membaca: "${status}".`);

    if (supabaseHealth.tableExists) {
      updateNovelFieldsInSupabase(novelId, { status }).catch((err) =>
        console.error('Gagal sync status ke Supabase:', err)
      );
    }
  };

  // Update reading progress
  const handleUpdateProgress = (
    novelId: string,
    chapterIndex: number,
    scrollPercent: number
  ) => {
    const target = novels.find((n) => n.id === novelId);
    const progressData = {
      currentChapterIndex: chapterIndex,
      scrollPercent,
      lastReadAt: 'Baru saja',
    };
    const newStatus: Novel['status'] =
      scrollPercent >= 98 && chapterIndex === (target?.chapters.length ?? 1) - 1
        ? 'Selesai'
        : 'Sedang Dibaca';

    setNovels((prev) =>
      prev.map((n) => {
        if (n.id !== novelId) return n;
        return {
          ...n,
          status: newStatus,
          readingProgress: progressData,
        };
      })
    );

    if (supabaseHealth.tableExists) {
      updateNovelFieldsInSupabase(novelId, {
        status: newStatus,
        reading_progress: progressData,
      }).catch((err) => console.error('Gagal sync progres ke Supabase:', err));
    }
  };

  // Add note to novel
  const handleAddNote = (
    novelId: string,
    noteData: Omit<NovelNote, 'id' | 'createdAt'>
  ) => {
    const newNote: NovelNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    let updatedNotes: NovelNote[] = [];
    setNovels((prev) =>
      prev.map((n) => {
        if (n.id !== novelId) return n;
        updatedNotes = [newNote, ...(n.notes || [])];
        return {
          ...n,
          notes: updatedNotes,
        };
      })
    );

    showToast('Catatan kutipan berhasil disimpan.');

    if (supabaseHealth.tableExists) {
      updateNovelFieldsInSupabase(novelId, { notes: updatedNotes }).catch((err) =>
        console.error('Gagal sync catatan ke Supabase:', err)
      );
    }
  };

  // Add new novel
  const handleAddNovel = async (newNovel: Novel) => {
    setNovels((prev) => [newNovel, ...prev]);
    showToast(
      newNovel.isPdf
        ? `Novel PDF "${newNovel.title}" (${newNovel.chapters.length} bab) berhasil ditambahkan!`
        : `Novel "${newNovel.title}" berhasil ditambahkan.`
    );

    if (supabaseHealth.tableExists) {
      try {
        await upsertNovelToSupabase(newNovel);
        showToast(`Tersimpan aman di database Supabase!`);
      } catch (err: any) {
        console.error('Gagal menyimpan ke Supabase:', err);
        showToast(`Tersimpan offline. Supabase: ${err.message}`);
      }
    }
  };

  // Delete novel
  const handleDeleteNovel = async (novelId: string) => {
    setNovels((prev) => prev.filter((n) => n.id !== novelId));
    showToast('Novel telah dihapus.');

    if (supabaseHealth.tableExists) {
      try {
        await deleteNovelFromSupabase(novelId);
      } catch (err) {
        console.error('Gagal menghapus dari Supabase:', err);
      }
    }
  };

  // Reset to initial
  const handleResetNovels = async () => {
    setNovels(INITIAL_NOVELS);
    localStorage.removeItem('ruang_novel_collection_v3');
    showToast('Koleksi dikembalikan ke 20 naskah standar.');

    if (supabaseHealth.tableExists) {
      try {
        await seedNovelsToSupabase(INITIAL_NOVELS);
        showToast('Supabase di-reset ke 20 naskah bawaan.');
      } catch (err) {
        console.error('Gagal reset Supabase:', err);
      }
    }
  };

  // Import novels
  const handleImportNovels = (imported: Novel[]) => {
    setNovels(imported);
    showToast(`Berhasil memuat ${imported.length} novel.`);
  };

  // STRICT FILTERING: Only novels of the selected file compartment are shown!
  const filteredNovels = useMemo(() => {
    return novels.filter((novel) => {
      // 1. Strict Compartment
      if (activeFileType !== 'all' && novel.fileType !== activeFileType) {
        return false;
      }
      // 2. Genre filter
      if (selectedGenre !== 'all' && novel.genre !== selectedGenre) {
        return false;
      }
      // 3. Status filter
      if (filterReadStatus !== 'all' && novel.status !== filterReadStatus) {
        return false;
      }
      // 4. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = novel.title.toLowerCase().includes(q);
        const matchAuthor = novel.author.toLowerCase().includes(q);
        const matchSynopsis = novel.synopsis.toLowerCase().includes(q);
        const matchGenre = novel.genre.toLowerCase().includes(q);
        const matchChapters = novel.chapters.some((c) =>
          c.title.toLowerCase().includes(q)
        );
        return matchTitle || matchAuthor || matchSynopsis || matchGenre || matchChapters;
      }
      return true;
    });
  }, [novels, activeFileType, selectedGenre, filterReadStatus, searchQuery]);

  const currentReadingNovel = novels.find((n) => n.id === readingNovelId);
  const currentSelectedNovel = novels.find((n) => n.id === selectedNovelId);

  // If in Reader Mode, render full-screen immersive ReaderView
  if (currentReadingNovel) {
    return (
      <ReaderView
        novel={currentReadingNovel}
        initialChapterIndex={readingChapterIdx}
        onBack={() => {
          setReadingNovelId(null);
          setReadingChapterIdx(undefined);
        }}
        onUpdateProgress={handleUpdateProgress}
        onAddNote={handleAddNote}
        onToggleBookmark={handleToggleBookmark}
      />
    );
  }

  // SCREEN 1: LAYAR MASUK / ENTRANCE SCREEN (Separated from inside app)
  if (currentScreen === 'entrance') {
    return (
      <>
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white py-2.5 px-4 rounded-xl shadow-2xl border border-sky-400 text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        <EntranceScreen
          onEnter={handleEnterApp}
          fileBaruCount={fileBaruCount}
          fileLamaCount={fileLamaCount}
          onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
          isTableReady={supabaseHealth.tableExists}
        />

        <SupabaseSyncModal
          isOpen={isSupabaseModalOpen}
          onClose={() => setIsSupabaseModalOpen(false)}
          health={supabaseHealth}
          isChecking={isCheckingSupabase}
          onRefreshHealth={() => checkAndLoadSupabase(true)}
          localNovels={novels}
          onSyncLocalToCloud={handleSyncLocalToCloud}
          isSyncing={isSyncingSupabase}
        />
      </>
    );
  }

  // SCREEN 2: DALAM BILIK TERPILIH (Strictly showing only the chosen file's novels)
  return (
    <div className="min-h-screen bg-[#f0f7ff] text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white py-2.5 px-4 rounded-xl shadow-2xl border border-sky-400 text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-2 h-2 rounded-full bg-sky-400" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Clean Single-Row Navbar with Back to Entrance Button & Supabase Status */}
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onReturnToEntrance={() => setCurrentScreen('entrance')}
        activeFileType={activeFileType}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        fileBaruCount={fileBaruCount}
        fileLamaCount={fileLamaCount}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        isTableReady={supabaseHealth.tableExists}
      />

      {/* Clean Compact Hero: Title + Search & Genre (No redundant paragraphs or file switchers) */}
      <LibraryHero
        activeFileType={activeFileType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        genres={genres}
        totalNovels={novels.length}
        fileBaruCount={fileBaruCount}
        fileLamaCount={fileLamaCount}
      />

      {/* Main Showcase Area (Clean and neat without duplicate header rows) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-5">
        {/* Tidy Status Filters */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-sky-200/80">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setFilterReadStatus('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterReadStatus === 'all'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-sky-200 hover:bg-sky-50'
              }`}
            >
              Semua ({filteredNovels.length})
            </button>
            <button
              onClick={() => setFilterReadStatus('Sedang Dibaca')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                filterReadStatus === 'Sedang Dibaca'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-sky-200 hover:bg-sky-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-sky-500" />
              <span>Sedang Dibaca</span>
            </button>
            <button
              onClick={() => setFilterReadStatus('Selesai')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                filterReadStatus === 'Selesai'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-sky-200 hover:bg-sky-50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Tamat</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
            {filteredNovels.length} dari {activeFileType === 'file_baru' ? fileBaruCount : fileLamaCount} naskah
          </div>
        </div>

        {/* View Mode: Bookshelf vs Grid View (Both strictly respect activeFileType) */}
        {viewMode === 'shelf' ? (
          <BookshelfView
            novels={filteredNovels}
            activeFileType={activeFileType}
            onSelectNovel={(novel) => setSelectedNovelId(novel.id)}
            onReadNovel={(novel) => handleOpenReader(novel.id)}
            onToggleBookmark={handleToggleBookmark}
            onMoveFileType={handleMoveFileType}
          />
        ) : (
          <div className="pt-4 sm:pt-6">
            {filteredNovels.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-sky-300 p-8 max-w-lg mx-auto shadow-sm">
                <FilterX className="w-9 h-9 mx-auto text-sky-400 mb-2.5" />
                <h3 className="font-serif-title font-bold text-base text-slate-800">
                  Tidak Ada Novel yang Sesuai
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Coba sesuaikan kata kunci pencarian atau reset filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedGenre('all');
                    setFilterReadStatus('all');
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-500 cursor-pointer shadow-sm"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5">
                {filteredNovels.map((novel) => (
                  <NovelCard
                    key={novel.id}
                    novel={novel}
                    onSelectNovel={(n) => setSelectedNovelId(n.id)}
                    onReadNovel={(n) => handleOpenReader(n.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onMoveFileType={handleMoveFileType}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Tidy Footer with Return to Entrance Link */}
      <footer className="mt-auto border-t border-sky-200 bg-white text-slate-600 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={() => setCurrentScreen('entrance')}
            className="flex items-center gap-1.5 text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Gerbang Utama</span>
          </button>

          <div className="text-slate-400">
            © {new Date().getFullYear()} Ruang Novel · Bilik {activeFileType === 'file_baru' ? 'File Baru' : 'File Lama'}
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <NovelDetailModal
        novel={currentSelectedNovel || null}
        onClose={() => setSelectedNovelId(null)}
        onReadNovel={(n, chIdx) => handleOpenReader(n.id, chIdx)}
        onToggleBookmark={handleToggleBookmark}
        onMoveFileType={handleMoveFileType}
        onUpdateStatus={handleUpdateStatus}
        onDeleteNovel={handleDeleteNovel}
      />

      <AddNovelModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddNovel={handleAddNovel}
        defaultFileType={activeFileType === 'file_lama' ? 'file_lama' : 'file_baru'}
      />

      <LibraryStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        novels={novels}
        onResetNovels={handleResetNovels}
        onImportNovels={handleImportNovels}
      />

      <NotesDrawer
        isOpen={isNotesDrawerOpen}
        onClose={() => setIsNotesDrawerOpen(false)}
        novels={novels}
        onOpenNovel={(n) => {
          setSelectedNovelId(n.id);
        }}
      />

      <SupabaseSyncModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        health={supabaseHealth}
        isChecking={isCheckingSupabase}
        onRefreshHealth={() => checkAndLoadSupabase(true)}
        localNovels={novels}
        onSyncLocalToCloud={handleSyncLocalToCloud}
        isSyncing={isSyncingSupabase}
      />
    </div>
  );
}
