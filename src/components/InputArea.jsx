import { useRef, useState, useCallback } from 'react';
import { useFileParser } from '../hooks/useFileParser';

/**
 * InputArea
 * ─────────
 * • Textarea for manual CV paste
 * • Click-to-upload button (PDF / DOCX)
 * • Drag-and-drop zone (fixed: prevents browser from opening file in a new tab)
 * • Shows upload progress / errors inline
 */
export default function InputArea({ cvText, onChange, onSubmit, isLoading }) {
  const fileInputRef = useRef(null);
  const { parseFile } = useFileParser();

  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [parseError, setParseError] = useState(null);

  // ── File processing ──────────────────────────────────────────────────────────
  const handleFile = useCallback(
    async (file) => {
      if (!file) return;
      setParseError(null);
      setUploadedFileName(null);
      setIsParsing(true);

      try {
        const text = await parseFile(file);
        onChange(text);
        setUploadedFileName(file.name);
      } catch (err) {
        setParseError(err.message);
      } finally {
        setIsParsing(false);
      }
    },
    [parseFile, onChange]
  );

  // ── Input[file] change ───────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  // ── Drag-and-drop (THE FIX: preventDefault on dragover + drop) ──────────────
  const handleDragOver = (e) => {
    e.preventDefault();      // ← stops browser from navigating to the file
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only clear when leaving the drop zone entirely (not a child element)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();      // ← stops browser from opening the file
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  // ── Clear uploaded file ──────────────────────────────────────────────────────
  const handleClear = () => {
    onChange('');
    setUploadedFileName(null);
    setParseError(null);
  };

  return (
    <div
      id="input-area"
      className="w-full max-w-3xl mx-auto mb-stack-lg flex flex-col gap-stack-md"
    >
      {/* ── Drop zone + Textarea ── */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full rounded-xl bg-white border-2 transition-all duration-200
                    roast-card-shadow overflow-hidden
                    ${isDragging
                      ? 'border-amber-400 bg-amber-50 shadow-md shadow-amber-100'
                      : 'border-gray-200 focus-within:border-amber-400'
                    }`}
      >
        {/* Drag overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center
                          bg-amber-50/90 backdrop-blur-sm pointer-events-none">
            <span className="material-symbols-outlined text-amber-500 text-5xl mb-2">
              upload_file
            </span>
            <p className="text-amber-700 font-semibold text-body-md">
              Drop your CV here
            </p>
          </div>
        )}

        {/* Parsing overlay */}
        {isParsing && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center
                          bg-white/90 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full border-4 border-amber-200 border-t-amber-500
                            animate-spin mb-3" />
            <p className="text-gray-500 text-body-md">Extracting text...</p>
          </div>
        )}

        <textarea
          id="cv-textarea"
          value={cvText}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your CV text here, or drag & drop / upload a PDF or DOCX file above..."
          className="w-full h-64 p-6 bg-transparent border-none outline-none resize-none
                     text-body-md text-gray-800 placeholder-gray-400 font-inter"
        />

        {/* File info bar — shown after successful upload */}
        {uploadedFileName && !isParsing && (
          <div className="flex items-center justify-between px-6 py-3
                          border-t border-amber-100 bg-amber-50">
            <div className="flex items-center gap-2 text-sm text-amber-800">
              <span className="material-symbols-outlined text-amber-600 text-base">
                description
              </span>
              <span className="font-medium truncate max-w-xs">{uploadedFileName}</span>
              <span className="text-amber-600 text-xs">— text extracted ✓</span>
            </div>
            <button
              onClick={handleClear}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors
                         flex items-center gap-1"
              title="Clear"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Clear
            </button>
          </div>
        )}
      </div>

      {/* ── Upload controls row ── */}
      <div className="flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-3">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleInputChange}
            className="hidden"
            id="file-upload-input"
          />

          {/* Upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isParsing || isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed
                       border-gray-300 hover:border-amber-400 hover:bg-amber-50
                       text-sm font-semibold text-gray-500 hover:text-amber-700
                       transition-all duration-150 active:scale-95
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-base">upload_file</span>
            Upload PDF / DOCX
          </button>

          <span className="text-xs text-gray-400">or drag & drop onto the box</span>
        </div>

        {/* Character count */}
        {cvText.length > 0 && (
          <span className="text-xs text-gray-400 flex-shrink-0">
            {cvText.length.toLocaleString()} chars
          </span>
        )}
      </div>

      {/* ── Parse error ── */}
      {parseError && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200
                        rounded-xl px-5 py-4">
          <span className="material-symbols-outlined text-red-500 flex-shrink-0 mt-0.5">
            error
          </span>
          <p className="text-sm text-red-700 leading-relaxed">{parseError}</p>
        </div>
      )}

      {/* ── Submit button ── */}
      <div className="flex justify-center">
        <button
          id="roast-submit-btn"
          onClick={onSubmit}
          disabled={isLoading || isParsing || !cvText.trim()}
          className="bg-primary-container text-gray-900 font-bold py-4 px-12 rounded-xl
                     text-body-lg hover:bg-amber-400 transition-all duration-150
                     active:scale-95 shadow-sm
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                     flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-gray-900
                               border-t-transparent rounded-full animate-spin" />
              Roasting...
            </>
          ) : (
            'Roast My CV 🔥'
          )}
        </button>
      </div>
    </div>
  );
}
