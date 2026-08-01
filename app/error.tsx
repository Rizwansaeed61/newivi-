'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Client-side exception caught by error boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0B0907] text-[#F9F7F2] flex items-center justify-center p-6 selection:bg-[#E59500] selection:text-[#15120E]">
      <div className="max-w-md w-full bg-[#15120E]/90 border border-[#E59500]/30 rounded-3xl p-8 text-center backdrop-blur-xl shadow-2xl">
        <div className="w-16 h-16 bg-[#E59500]/10 border border-[#E59500]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-[#E59500]" />
        </div>

        <h2 className="text-2xl font-bold text-[#F9F7F2] mb-3 tracking-tight">
          Application Error Resolved
        </h2>
        <p className="text-xs text-[#A3998E] leading-relaxed mb-6 font-mono">
          A temporary client-side state exception occurred. You can retry loading the page or return to the main dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex-1 px-5 py-3 bg-[#E59500] hover:bg-[#F3B700] text-[#15120E] text-xs font-bold font-mono rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E59500]/20"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 px-5 py-3 bg-[#241E17] hover:bg-[#322A20] text-[#F9F7F2] text-xs font-bold font-mono rounded-xl border border-[#3E3427] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#E59500]" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
