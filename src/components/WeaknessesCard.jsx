/**
 * WeaknessesCard - Red list of CV weaknesses
 */
export default function WeaknessesCard({ weaknesses }) {
  return (
    <div className="bg-white border border-[#F3F4F6] rounded-xl p-6 roast-card-shadow flex flex-col">
      <div className="flex items-center gap-2 mb-4 border-b border-[#F3F4F6] pb-4">
        <span className="material-symbols-outlined text-red-500">cancel</span>
        <h3 className="text-label-sm font-semibold text-gray-400 uppercase tracking-widest font-inter">
          What&apos;s Weak
        </h3>
      </div>

      <ul className="flex flex-col gap-3 text-body-md text-gray-700 font-inter">
        {weaknesses.map((weakness, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
            <span>{weakness}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
