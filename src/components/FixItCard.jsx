/**
 * FixItCard - Actionable improvement tips in 2-column grid
 */
export default function FixItCard({ tips }) {
  return (
    <div className="bg-[#FFFDF5] border border-amber-200 rounded-xl p-6 roast-card-shadow md:col-span-2 flex flex-col">
      <div className="flex items-center gap-2 mb-4 border-b border-amber-100 pb-4">
        <span className="material-symbols-outlined text-amber-600">lightbulb</span>
        <h3 className="text-label-sm font-semibold text-amber-800 uppercase tracking-widest font-inter">
          Fix It
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tips.map((tip, i) => (
          <div key={i} className="bg-white border border-amber-100 rounded-lg p-4">
            <h4 className="text-h3 font-semibold text-gray-900 mb-2 font-inter">{tip.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed font-inter">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
