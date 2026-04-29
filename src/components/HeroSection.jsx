/**
 * HeroSection - Centered headline and subtext
 */
export default function HeroSection() {
  return (
    <div className="text-center w-full mb-stack-lg max-w-2xl mx-auto">
      <h1 className="text-h1 font-bold text-gray-900 mb-stack-sm leading-tight tracking-tight">
        Paste your CV. Get roasted.
      </h1>
      <p className="text-body-lg text-gray-500">
        AI-powered feedback that&apos;s honest, sharp, and actually useful.
      </p>
    </div>
  );
}
