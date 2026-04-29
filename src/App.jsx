import { useState, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InputArea from './components/InputArea';
import LoadingState from './components/LoadingState';
import ResultSection from './components/ResultSection';
import Footer from './components/Footer';
import { useGemini } from './hooks/useGemini';

export default function App() {
  const [cvText, setCvText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const { analyzeCV } = useGemini();
  const inputRef = useRef(null);

  /** Scroll to the textarea when header button is clicked */
  const scrollToInput = () => {
    document.getElementById('input-area')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('cv-textarea')?.focus();
  };

  /** Main roast handler */
  const handleRoast = async () => {
    if (!cvText.trim()) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await analyzeCV(cvText);
      setResult(data);
    } catch (err) {
      console.error('Gemini API error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] font-inter">
      <Header onRoastClick={scrollToInput} />

      <main className="flex-grow flex flex-col items-center w-full px-6 py-stack-lg max-w-content mx-auto">
        <HeroSection />

        <InputArea
          cvText={cvText}
          onChange={setCvText}
          onSubmit={handleRoast}
          isLoading={isLoading}
        />

        {/* Error message */}
        {error && (
          <div className="w-full max-w-3xl mx-auto mb-stack-md">
            <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-red-500 mt-0.5 flex-shrink-0">error</span>
              <p className="text-sm text-red-700 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && <LoadingState />}

        {/* Results */}
        {result && !isLoading && <ResultSection result={result} />}
      </main>

      <Footer />
    </div>
  );
}
