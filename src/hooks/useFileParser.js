import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';

// Point pdf.js worker to its bundled file (served from node_modules via Vite)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const SUPPORTED_TYPES = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'docx',
};

/**
 * Extracts raw text from a PDF file using pdf.js
 */
async function extractFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

  const pageTexts = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    // ── Position-aware extraction ──────────────────────────────────────────
    // pdf.js item.transform = [scaleX, skew, skew, scaleY, x, y]
    // We sort by Y descending (top of page first), then X ascending (left→right).
    // Items within LINE_THRESHOLD px of each other are treated as the same line.
    const LINE_THRESHOLD = 5; // px tolerance for "same line"

    const items = content.items
      .filter((item) => item.str && item.str.trim() !== '')
      .map((item) => ({
        str: item.str,
        x: item.transform[4],
        y: item.transform[5],
      }))
      .sort((a, b) => {
        const yDiff = b.y - a.y; // descending Y (top of page = high Y value in PDF coords)
        if (Math.abs(yDiff) > LINE_THRESHOLD) return yDiff;
        return a.x - b.x;        // same line → left to right
      });

    // Group into lines, then join lines with newlines
    const lines = [];
    let currentLine = [];
    let lastY = null;

    for (const item of items) {
      if (lastY === null || Math.abs(item.y - lastY) <= LINE_THRESHOLD) {
        currentLine.push(item.str);
      } else {
        if (currentLine.length) lines.push(currentLine.join(' '));
        currentLine = [item.str];
      }
      lastY = item.y;
    }
    if (currentLine.length) lines.push(currentLine.join(' '));

    pageTexts.push(lines.join('\n'));
  }

  // Collapse 3+ consecutive spaces but keep newlines intact
  return pageTexts.join('\n\n').replace(/[ \t]{3,}/g, '  ').trim();
}


/**
 * Extracts raw text from a DOCX file using mammoth
 */
async function extractFromDocx(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.replace(/\s{3,}/g, '  ').trim();
}

/**
 * useFileParser - Custom hook for parsing PDF and DOCX files into plain text
 *
 * Returns: { parseFile }
 * parseFile(file) → Promise<string>  (throws on unsupported type or empty result)
 */
export function useFileParser() {
  const parseFile = async (file) => {
    if (!file) throw new Error('No file provided.');

    const fileType = SUPPORTED_TYPES[file.type];

    if (!fileType) {
      // Also check by extension for edge cases (e.g., Windows missing MIME type)
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext === 'pdf') {
        return extractFromPdf(file);
      } else if (ext === 'docx' || ext === 'doc') {
        return extractFromDocx(file);
      }
      throw new Error(
        `Unsupported file type: "${file.name}". Please upload a PDF or DOCX file.`
      );
    }

    const text = fileType === 'pdf'
      ? await extractFromPdf(file)
      : await extractFromDocx(file);

    if (!text || text.length < 20) {
      throw new Error(
        'Could not extract readable text from this file. It may be scanned/image-based or empty.'
      );
    }

    return text;
  };

  return { parseFile };
}
