import * as pdfjsLib from 'pdfjs-dist';
import { Chapter } from '../types/novel';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

export interface ExtractedPdfNovel {
  title: string;
  author: string;
  pageCount: number;
  coverImage?: string;
  synopsis?: string;
  chapters: Chapter[];
  pdfDataUrl: string;
  fileName: string;
}

export async function parsePdfFile(file: File): Promise<ExtractedPdfNovel> {
  const arrayBuffer = await file.arrayBuffer();

  // Convert to base64 data URL for caching / viewing (up to reasonable size)
  const base64Promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const pdfDataUrl = await base64Promise;

  // Load document with pdfjs
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  // Generate cover thumbnail from first page
  let coverImage = '';
  try {
    const firstPage = await pdf.getPage(1);
    const viewport = firstPage.getViewport({ scale: 0.8 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Use any cast to satisfy type across different pdfjs versions
      await (firstPage.render({ canvasContext: ctx, viewport } as any)).promise;
      coverImage = canvas.toDataURL('image/jpeg', 0.85);
    }
  } catch (err) {
    console.warn('Gagal membuat sampul dari halaman 1 PDF:', err);
  }

  // Extract text per page
  const pageTexts: { pageNum: number; text: string }[] = [];
  for (let i = 1; i <= numPages; i++) {
    try {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items
        .map((item) => ('str' in item ? (item as any).str : ''))
        .filter(Boolean);
      const pageText = strings.join(' ').replace(/\s+/g, ' ').trim();
      if (pageText.length > 0) {
        pageTexts.push({ pageNum: i, text: pageText });
      }
    } catch (e) {
      console.warn(`Gagal membaca halaman ${i}:`, e);
    }
  }

  // Derive title from filename
  const cleanTitle = file.name
    .replace(/\.[^/.]+$/, '') // remove extension
    .replace(/[_-]+/g, ' ')
    .trim();

  // Group pages into chapters
  const chapters: Chapter[] = [];
  
  if (pageTexts.length === 0) {
    // Fallback if PDF has only scanned images without OCR text
    chapters.push({
      id: `chap-${Date.now()}-1`,
      chapterNumber: 1,
      title: 'Bab 1: Berkas PDF Digital',
      content: [
        `Naskah digital dari berkas ${file.name} telah berhasil diimpor ke dalam Ruang Novel.`,
        `Dokumen ini memiliki total ${numPages} halaman PDF yang tersimpan aman di perpustakaan.`,
      ],
      wordsCount: 150,
    });
  } else {
    // Check if pages contain explicit chapter markers (e.g. "Bab 1", "BAB I", "Chapter")
    const chapterRegex = /^(?:bab|chapter|bagian)\s+([0-9ivxlcdm]+|[a-z]+)[:.-]?\s*(.*)$/i;

    let currentChapterPages: { pageNum: number; text: string }[] = [];
    let currentChapterTitle = 'Bab 1: Permulaan Kisah';
    let chapterIndex = 1;

    for (let p = 0; p < pageTexts.length; p++) {
      const { pageNum, text } = pageTexts[p];
      const firstLine = text.slice(0, 80).trim();
      const match = firstLine.match(chapterRegex);

      // If explicit chapter heading found and we already have some pages accumulated
      if (match && currentChapterPages.length > 0) {
        // Finalize previous chapter
        const paragraphs = buildParagraphs(currentChapterPages.map((cp) => cp.text).join('\n\n'));
        const words = paragraphs.join(' ').split(/\s+/).length;
        chapters.push({
          id: `chap-${Date.now()}-${chapterIndex}`,
          chapterNumber: chapterIndex,
          title: currentChapterTitle,
          content: paragraphs,
          wordsCount: words,
        });

        chapterIndex++;
        currentChapterTitle = `Bab ${chapterIndex}: ${match[2] || `Bagian ${match[1]}`}`.trim();
        currentChapterPages = [{ pageNum, text }];
      } else {
        currentChapterPages.push({ pageNum, text });

        // If no explicit chapters, chunk every 3 to 4 pages into a chapter for comfortable reading
        if (!match && currentChapterPages.length >= 4) {
          const startP = currentChapterPages[0].pageNum;
          const endP = currentChapterPages[currentChapterPages.length - 1].pageNum;
          const paragraphs = buildParagraphs(currentChapterPages.map((cp) => cp.text).join('\n\n'));
          const words = paragraphs.join(' ').split(/\s+/).length;

          chapters.push({
            id: `chap-${Date.now()}-${chapterIndex}`,
            chapterNumber: chapterIndex,
            title: `Bab ${chapterIndex}: Halaman ${startP} - ${endP}`,
            content: paragraphs,
            wordsCount: words,
          });

          chapterIndex++;
          currentChapterTitle = `Bab ${chapterIndex}: Halaman ${endP + 1}`;
          currentChapterPages = [];
        }
      }
    }

    // Push remaining pages as last chapter
    if (currentChapterPages.length > 0) {
      const startP = currentChapterPages[0].pageNum;
      const endP = currentChapterPages[currentChapterPages.length - 1].pageNum;
      const paragraphs = buildParagraphs(currentChapterPages.map((cp) => cp.text).join('\n\n'));
      const words = paragraphs.join(' ').split(/\s+/).length;

      chapters.push({
        id: `chap-${Date.now()}-${chapterIndex}`,
        chapterNumber: chapterIndex,
        title: chapters.length === 0 ? `Bab 1: Naskah Lengkap (Hlm 1-${numPages})` : `Bab ${chapterIndex}: Halaman ${startP} - ${endP}`,
        content: paragraphs,
        wordsCount: words,
      });
    }
  }

  // Build brief synopsis from first page text
  const firstText = pageTexts[0]?.text || '';
  const synopsis =
    firstText.length > 40
      ? firstText.slice(0, 220).replace(/\s+/g, ' ').trim() + '...'
      : `Buku novel digital "${cleanTitle}" yang diimpor dari berkas PDF dengan ${numPages} halaman.`;

  return {
    title: cleanTitle,
    author: 'Penulis Digital',
    pageCount: numPages,
    coverImage,
    synopsis,
    chapters,
    pdfDataUrl,
    fileName: file.name,
  };
}

function buildParagraphs(rawText: string): string[] {
  // Split by double newline or long sentences
  const rawParts = rawText
    .split(/(?:\r?\n\s*\r?\n)|(?<=[.!?])\s{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 10);

  if (rawParts.length > 0) return rawParts;

  // Fallback: chunk by ~400 characters
  const chunks: string[] = [];
  const words = rawText.split(/\s+/);
  let temp: string[] = [];
  for (const w of words) {
    temp.push(w);
    if (temp.length >= 60) {
      chunks.push(temp.join(' '));
      temp = [];
    }
  }
  if (temp.length > 0) chunks.push(temp.join(' '));
  return chunks.length > 0 ? chunks : [rawText];
}
