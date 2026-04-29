/**
 * StrengthsCard - Green checklist of CV strengths
 */
export default function StrengthsCard({ strengths }) {
  return (
    <div className="bg-white border border-[#F3F4F6] rounded-xl p-6 roast-card-shadow flex flex-col">
      <div className="flex items-center gap-2 mb-4 border-b border-[#F3F4F6] pb-4">
        <span className="material-symbols-outlined text-green-600">check_circle</span>
        <h3 className="text-label-sm font-semibold text-gray-400 uppercase tracking-widest font-inter">
          What&apos;s Good
        </h3>
      </div>

      <ul className="flex flex-col gap-3 text-body-md text-gray-700 font-inter">
        {strengths.map((strength, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
            <span>{strength}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
