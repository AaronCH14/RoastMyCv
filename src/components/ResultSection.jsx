import { useEffect, useRef } from 'react';
import ScoreCard from './ScoreCard';
import RoastCard from './RoastCard';
import StrengthsCard from './StrengthsCard';
import WeaknessesCard from './WeaknessesCard';
import FixItCard from './FixItCard';

/**
 * ResultSection - Full results panel, smoothly animated in on mount
 */
export default function ResultSection({ result }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      // Trigger the CSS transition on mount
      requestAnimationFrame(() => {
        sectionRef.current?.classList.remove('result-enter');
        sectionRef.current?.classList.add('result-visible');
      });
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="result-enter w-full flex flex-col gap-stack-lg mt-stack-lg border-t border-gray-200 pt-stack-lg"
    >
      <ScoreCard score={result.score} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full">
        <RoastCard roast={result.roast} />
        <StrengthsCard strengths={result.strengths} />
        <WeaknessesCard weaknesses={result.weaknesses} />
        <FixItCard tips={result.tips} />
      </div>
    </div>
  );
}
