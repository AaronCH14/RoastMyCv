/**
 * Footer - Simple centered footer with links and copyright
 */
export default function Footer() {
  return (
    <footer className="bg-gray-50 w-full py-12 mt-24 border-t border-gray-100">
      <div className="max-w-content mx-auto px-6 flex flex-col items-center gap-6 text-center">
        <div className="text-lg font-black text-gray-900 tracking-tight">RoastMyCV</div>

        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-amber-600 transition-colors duration-150 opacity-80 hover:opacity-100"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-amber-600 transition-colors duration-150 opacity-80 hover:opacity-100"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-amber-600 transition-colors duration-150 opacity-80 hover:opacity-100"
          >
            Contact
          </a>
        </div>

        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()} RoastMyCV. Brutally honest career advice.
        </div>
      </div>
    </footer>
  );
}
