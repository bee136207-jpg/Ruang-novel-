import { createClient } from '@supabase/supabase-js';
import { Novel } from '../types/novel';

// Supabase credentials provided by user
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://lowpczxbfkhnvmotpppo.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvd3BjenhiZmtobnZtb3RwcHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4NzUxNDAsImV4cCI6MjEwOTQ1MTE0MH0.Wgl6FEGUHrEKeZ7gsEySeHuQyuNFFNo39tgOzrYIQ1c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const SUPABASE_SQL_SETUP_SCRIPT = `-- Skrip Pembuatan Tabel Database Ruang Novel di Supabase
-- Buka Supabase Dashboard > SQL Editor > Paste skrip ini lalu klik "Run"

CREATE TABLE IF NOT EXISTS public.novels (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'file_baru',
  archive_badge TEXT DEFAULT '',
  year_published TEXT DEFAULT '2026',
  genre TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  cover_color TEXT DEFAULT '#0369a1',
  spine_text_color TEXT DEFAULT '#bae6fd',
  synopsis TEXT DEFAULT '',
  rating NUMERIC DEFAULT 5.0,
  page_count INTEGER DEFAULT 120,
  chapters JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_bookmarked BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Belum Dibaca',
  reading_progress JSONB DEFAULT '{"currentChapterIndex": 0, "scrollPercent": 0}'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  notes JSONB DEFAULT '[]'::jsonb,
  date_added TEXT DEFAULT '',
  is_pdf BOOLEAN DEFAULT false,
  pdf_url TEXT,
  pdf_file_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Aktifkan Keamanan Row Level Security (RLS)
ALTER TABLE public.novels ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses: Izinkan Baca, Tambah, Edit & Hapus bagi Pengguna Aplikasi
DROP POLICY IF EXISTS "Akses Penuh Publik Ruang Novel" ON public.novels;
CREATE POLICY "Akses Penuh Publik Ruang Novel"
ON public.novels
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Aktifkan Sinkronisasi Realtime Supabase
ALTER PUBLICATION supabase_realtime ADD TABLE public.novels;
`;

export function dbRowToNovel(row: any): Novel {
  return {
    id: String(row.id),
    title: row.title || 'Tanpa Judul',
    author: row.author || 'Penulis Anonim',
    fileType: (row.file_type || row.fileType || 'file_baru') as Novel['fileType'],
    archiveBadge: row.archive_badge || row.archiveBadge || '',
    yearPublished: row.year_published || row.yearPublished || '2026',
    genre: row.genre || 'Sastra & Fiksi',
    coverImage: row.cover_image || row.coverImage || '',
    coverColor: row.cover_color || row.coverColor || '#0369a1',
    spineTextColor: row.spine_text_color || row.spineTextColor || '#bae6fd',
    synopsis: row.synopsis || '',
    rating: Number(row.rating) || 5.0,
    pageCount: Number(row.page_count || row.pageCount) || 120,
    chapters: Array.isArray(row.chapters) ? row.chapters : [],
    isBookmarked: Boolean(row.is_bookmarked ?? row.isBookmarked ?? false),
    status: (row.status || 'Belum Dibaca') as Novel['status'],
    readingProgress: row.reading_progress || row.readingProgress || {
      currentChapterIndex: 0,
      scrollPercent: 0,
    },
    tags: Array.isArray(row.tags) ? row.tags : [],
    notes: Array.isArray(row.notes) ? row.notes : [],
    dateAdded: row.date_added || row.dateAdded || new Date().toISOString().split('T')[0],
    isPdf: Boolean(row.is_pdf ?? row.isPdf ?? false),
    pdfUrl: row.pdf_url || row.pdfUrl || undefined,
    pdfFileName: row.pdf_file_name || row.pdfFileName || undefined,
  };
}

export function novelToDbRow(n: Novel): Record<string, any> {
  return {
    id: n.id,
    title: n.title,
    author: n.author,
    file_type: n.fileType,
    archive_badge: n.archiveBadge || '',
    year_published: String(n.yearPublished),
    genre: n.genre || '',
    cover_image: n.coverImage || '',
    cover_color: n.coverColor || '#0369a1',
    spine_text_color: n.spineTextColor || '#bae6fd',
    synopsis: n.synopsis || '',
    rating: n.rating || 5.0,
    page_count: n.pageCount || 120,
    chapters: n.chapters || [],
    is_bookmarked: Boolean(n.isBookmarked),
    status: n.status || 'Belum Dibaca',
    reading_progress: n.readingProgress || { currentChapterIndex: 0, scrollPercent: 0 },
    tags: n.tags || [],
    notes: n.notes || [],
    date_added: n.dateAdded || new Date().toISOString().split('T')[0],
    is_pdf: Boolean(n.isPdf),
    pdf_url: n.pdfUrl || null,
    pdf_file_name: n.pdfFileName || null,
    updated_at: new Date().toISOString(),
  };
}

export interface SupabaseHealth {
  isConnected: boolean;
  tableExists: boolean;
  message: string;
}

// Check if Supabase is reachable and if table 'novels' exists
export async function checkSupabaseHealth(): Promise<SupabaseHealth> {
  try {
    const { data, error } = await supabase.from('novels').select('id').limit(1);

    if (error) {
      if (error.code === 'PGRST205' || error.message.includes('schema cache')) {
        return {
          isConnected: true,
          tableExists: false,
          message: 'Terhubung ke Supabase, namun tabel "novels" belum dibuat di database.',
        };
      }
      return {
        isConnected: false,
        tableExists: false,
        message: `Koneksi Supabase error: ${error.message}`,
      };
    }

    return {
      isConnected: true,
      tableExists: true,
      message: 'Database Supabase aktif & tabel "novels" siap digunakan.',
    };
  } catch (err: any) {
    return {
      isConnected: false,
      tableExists: false,
      message: `Gagal menghubungi Supabase: ${err.message || 'Network error'}`,
    };
  }
}

// Fetch all novels from Supabase
export async function fetchNovelsFromSupabase(): Promise<Novel[]> {
  const { data, error } = await supabase
    .from('novels')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data || []).map(dbRowToNovel);
}

// Insert or update a novel in Supabase
export async function upsertNovelToSupabase(novel: Novel): Promise<void> {
  const row = novelToDbRow(novel);
  const { error } = await supabase.from('novels').upsert(row, { onConflict: 'id' });

  if (error) {
    throw error;
  }
}

// Bulk insert initial novels to seed the database
export async function seedNovelsToSupabase(novels: Novel[]): Promise<void> {
  const rows = novels.map(novelToDbRow);
  const { error } = await supabase.from('novels').upsert(rows, { onConflict: 'id' });

  if (error) {
    throw error;
  }
}

// Delete novel from Supabase
export async function deleteNovelFromSupabase(novelId: string): Promise<void> {
  const { error } = await supabase.from('novels').delete().eq('id', novelId);

  if (error) {
    throw error;
  }
}

// Update specific fields of a novel
export async function updateNovelFieldsInSupabase(
  novelId: string,
  fields: Partial<Record<string, any>>
): Promise<void> {
  const { error } = await supabase.from('novels').update(fields).eq('id', novelId);

  if (error) {
    throw error;
  }
}
