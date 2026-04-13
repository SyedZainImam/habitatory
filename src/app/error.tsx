"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-6">
      <div className="text-center max-w-md">
        <h2
          className="text-2xl font-bold text-[#2C5F72] mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Something went wrong
        </h2>
        <p className="text-zinc-500 mb-8 text-sm">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-[#d4af37] text-[#1a3c47] font-bold tracking-widest uppercase text-xs px-8 py-3.5 rounded-lg hover:bg-[#e8c964] transition-all duration-300 shadow-md"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
