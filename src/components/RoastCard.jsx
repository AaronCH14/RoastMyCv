/**
 * RoastCard - The main roast text with amber left accent bar
 */
export default function RoastCard({ roast }) {
  return (
    <div className="bg-white border border-[#F3F4F6] rounded-xl p-6 relative overflow-hidden roast-card-shadow md:col-span-2">
      {/* Amber left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />

      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-amber-500">local_fire_department</span>
        <h3 className="text-label-sm font-semibold text-gray-400 uppercase tracking-widest font-inter">
          The Roast
        </h3>
      </div>

      <p className="text-body-md text-gray-800 leading-relaxed font-inter">{roast}</p>
    </div>
  );
}
