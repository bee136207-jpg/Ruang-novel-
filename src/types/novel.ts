export type NovelFileType = 'file_baru' | 'file_lama';

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  content: string[];
  wordsCount: number;
}

export interface NovelNote {
  id: string;
  chapterIndex: number;
  chapterTitle: string;
  text: string;
  quote?: string;
  createdAt: string;
}

export interface Novel {
  id: string;
  title: string;
  author: string;
  fileType: NovelFileType;
  archiveBadge: string; // e.g. "Arsip Balai Pustaka 1937" or "Rilisan Digital 2026"
  yearPublished: string | number;
  genre: string;
  coverImage: string;
  coverColor: string; // CSS color or gradient for spine/fallback
  spineTextColor?: string;
  synopsis: string;
  rating: number;
  pageCount: number;
  chapters: Chapter[];
  isBookmarked: boolean;
  status: 'Belum Dibaca' | 'Sedang Dibaca' | 'Selesai';
  readingProgress: {
    currentChapterIndex: number;
    scrollPercent: number;
    lastReadAt?: string;
  };
  tags: string[];
  notes: NovelNote[];
  dateAdded: string;
  isPdf?: boolean;
  pdfUrl?: string;
  pdfFileName?: string;
}

export type ReaderTheme = 'sepia' | 'light' | 'dark' | 'mint' | 'sky';
export type ReaderFont = 'cormorant' | 'lora' | 'sans';

export interface ReaderSettings {
  theme: ReaderTheme;
  fontFamily: ReaderFont;
  fontSize: number; // in px, e.g. 18
  lineHeight: number; // e.g. 1.8
  maxWidth: number; // e.g. 680, 780, 920
  textAlign: 'justify' | 'left';
}
