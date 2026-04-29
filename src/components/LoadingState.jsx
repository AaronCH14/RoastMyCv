/**
 * LoadingState - Centered amber spinner while API is running
 */
export default function LoadingState() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-24 gap-4">
      <div
        className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin"
        role="status"
        aria-label="Loading"
      />
      <p className="text-body-md text-gray-500 font-inter">Roasting your CV...</p>
    </div>
  );
}
