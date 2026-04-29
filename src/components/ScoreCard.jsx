/**
 * ScoreCard - Displays the numeric CV score with amber progress bar
 */
export default function ScoreCard({ score }) {
  return (
    <div className="flex flex-col items-center text-center mb-stack-md">
      <span className="text-label-sm text-gray-400 uppercase tracking-widest mb-3 font-inter">
        CV Score
      </span>
      <div className="text-[64px] font-bold text-gray-900 leading-none mb-5 font-inter">
        {score}
        <span className="text-h2 text-gray-400 font-semibold">/100</span>
      </div>
      {/* Minimalist amber progress bar */}
      <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
