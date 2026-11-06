import React, { useState } from 'react';
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  X,
  Cloud,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  SupabaseHealth,
  SUPABASE_SQL_SETUP_SCRIPT,
  seedNovelsToSupabase,
} from '../lib/supabase';
import { Novel } from '../types/novel';

interface SupabaseSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  health: SupabaseHealth;
  isChecking: boolean;
  onRefreshHealth: () => Promise<void>;
  localNovels: Novel[];
  onSyncLocalToCloud: () => Promise<void>;
  isSyncing: boolean;
}

export const SupabaseSyncModal: React.FC<SupabaseSyncModalProps> = ({
  isOpen,
  onClose,
  health,
  isChecking,
  onRefreshHealth,
  localNovels,
  onSyncLocalToCloud,
  isSyncing,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-sky-800 text-slate-100 max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 shrink-0 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-950 border border-sky-500/50 flex items-center justify-center text-sky-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-title font-bold text-base sm:text-lg text-white leading-tight flex items-center gap-2">
                <span>Koneksi Database Supabase</span>
              </h2>
              <p className="text-[11px] text-sky-300/80 font-mono">
                lowpczxbfkhnvmotpppo.supabase.co
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

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1 text-xs sm:text-sm">
          {/* Status Box */}
          <div
            className={`p-3.5 sm:p-4 rounded-xl border flex items-start gap-3 ${
              health.tableExists
                ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-100'
                : health.isConnected
                ? 'bg-amber-950/50 border-amber-600/70 text-amber-100'
                : 'bg-rose-950/50 border-rose-600/70 text-rose-100'
            }`}
          >
            {health.tableExists ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : health.isConnected ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-xs sm:text-sm">
                {health.tableExists
                  ? 'Database Supabase Terhubung & Siap!'
                  : health.isConnected
                  ? 'Koneksi Berhasil, Perlu Membuat Tabel "novels"'
                  : 'Gagal Menghubungi Database'}
              </h4>
              <p className="text-[11px] sm:text-xs mt-1 leading-relaxed opacity-90">
                {health.message}
              </p>

              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={onRefreshHealth}
                  disabled={isChecking}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-semibold border border-slate-600 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin' : ''}`} />
                  <span>{isChecking ? 'Memeriksa...' : 'Cek Ulang Koneksi'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Setup Instructions if table does not exist */}
          {!health.tableExists && (
            <div className="space-y-3 bg-slate-850 p-3.5 sm:p-4 rounded-xl border border-sky-900/60">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs sm:text-sm text-sky-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Langkah Cepat Membuat Tabel di Supabase (1 Menit)</span>
                </h4>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                <li>
                  Buka tab baru ke{' '}
                  <a
                    href="https://supabase.com/dashboard/project/lowpczxbfkhnvmotpppo/sql/new"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 hover:underline inline-flex items-center gap-0.5 font-bold"
                  >
                    <span>Supabase SQL Editor</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  Klik tombol <strong>"Salin Skrip SQL"</strong> di bawah ini, lalu tempel (paste)
                  ke dalam SQL Editor Supabase.
                </li>
                <li>
                  Klik tombol hijau <strong>"RUN"</strong> di Supabase untuk mengeksekusi skrip.
                </li>
                <li>
                  Kembali ke aplikasi ini dan klik <strong>"Cek Ulang Koneksi"</strong>. Selesai!
                </li>
              </ol>

              {/* SQL Script Box with Copy Button */}
              <div className="relative mt-2">
                <div className="bg-slate-950 rounded-lg p-3 border border-slate-700 font-mono text-[10px] text-sky-200/90 max-h-36 overflow-y-auto leading-relaxed select-all">
                  <pre>{SUPABASE_SQL_SETUP_SCRIPT}</pre>
                </div>
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="absolute top-2 right-2 px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow-md cursor-pointer transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Skrip SQL'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Sync Local Novels to Cloud Button */}
          {health.tableExists && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-850 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                    <Cloud className="w-4 h-4 text-sky-400" />
                    <span>Sinkronisasi Koleksi Buku ke Supabase</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Unggah seluruh novel aktif ({localNovels.length} novel) ke database Postgres di
                    Supabase.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onSyncLocalToCloud}
                  disabled={isSyncing}
                  className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-slate-300 text-[11px]">
            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <span className="font-bold text-white block mb-0.5">☁️ Database PostgreSQL Cloud</span>
              <span>
                Data novel, bab, dan progres baca tersimpan aman di server Supabase, tidak hilang
                saat cache browser dibersihkan.
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <span className="font-bold text-white block mb-0.5">🔄 Sinkronisasi Antar Perangkat</span>
              <span>
                Membuka Ruang Novel dari HP maupun Laptop akan menampilkan naskah dan bilik file yang
                sama secara otomatis.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between shrink-0">
          <span className="text-[10px] text-slate-400 font-mono">
            Proyek: lowpczxbfkhnvmotpppo · PostgreSQL 15
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
