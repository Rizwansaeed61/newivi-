'use client';

import React, { useState } from 'react';

export default function FooterNewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="w-full max-w-md">
      {subscribed ? (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-mono font-bold text-center">
          ✓ Thank you for subscribing to our executive digest!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email..."
            required
            className="flex-1 bg-[#15120E] border border-[#2C2419] rounded-xl px-4 py-2.5 text-xs text-[#F9F7F2] placeholder-[#6B6053] focus:outline-none focus:border-[#E59500] transition-all font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#E59500] hover:bg-[#F2A413] text-[#15120E] font-bold text-xs rounded-xl transition-all font-mono cursor-pointer shrink-0"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
