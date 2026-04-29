/**
 * Header - Sticky top navigation bar
 */
export default function Header({ onRoastClick }) {
  return (
    <header className="bg-white sticky top-0 w-full z-50 border-b border-gray-100">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Tagline */}
        <div className="flex items-center gap-4">
          <span className="text-xl font-black text-gray-900 tracking-tight">
            RoastMyCV
          </span>
          <span className="text-gray-400 text-sm hidden sm:inline-block">
            Your CV, brutally honest.
          </span>
        </div>

        {/* CTA Button */}
        <button
          id="header-roast-btn"
          onClick={onRoastClick}
          className="bg-primary-container text-gray-900 font-bold px-4 py-2 rounded-lg
                     hover:bg-amber-400 transition-colors duration-150 active:scale-95
                     text-sm"
        >
          Roast My CV
        </button>
      </div>
    </header>
  );
}
