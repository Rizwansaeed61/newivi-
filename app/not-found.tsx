import React from 'react';
import Link from 'next/link';
import { HelpCircle, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0B0907] text-[#F9F7F2] flex items-center justify-center p-6 selection:bg-[#E59500] selection:text-[#15120E]">
      <div className="max-w-md w-full bg-[#15120E]/90 border border-[#E59500]/30 rounded-3xl p-8 text-center backdrop-blur-xl shadow-2xl">
        <div className="w-16 h-16 bg-[#E59500]/10 border border-[#E59500]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-[#E59500]" />
        </div>

        <h1 className="text-4xl font-extrabold text-[#E59500] mb-2 font-mono">404</h1>
        <h2 className="text-xl font-bold text-[#F9F7F2] mb-3 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-xs text-[#A3998E] leading-relaxed mb-6 font-mono">
          The requested route or resource could not be found. Please return to the portfolio home page.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E59500] hover:bg-[#F3B700] text-[#15120E] text-xs font-bold font-mono rounded-xl transition-all shadow-lg shadow-[#E59500]/20"
        >
          <Home className="w-4 h-4" />
          Back To Showcase
        </Link>
      </div>
    </div>
  );
}
