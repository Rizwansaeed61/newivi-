cat << 'INNER_EOF' > app/contact/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, User, Mail, Phone, Building, DollarSign, MessageSquare, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);

  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    const configStr = localStorage.getItem('rizwan_admin_whatsapp');
    if (configStr) {
      try {
        const config = JSON.parse(configStr);
        setWhatsappNumber(config.number || '');
      } catch (e) {}
    }
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, (_, i) => i);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    const prevMonthDate = new Date(year, month - 1, 1);
    const currentMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prevMonthDate >= currentMonthDate) {
      setCurrentDate(new Date(year, month - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (d: number) => {
    const clickedDate = new Date(year, month, d);
    if (clickedDate >= today) {
      setSelectedDate(clickedDate);
      setSelectedTime(null);
    }
  };

  const isPastMonth = new Date(year, month - 1, 1) < new Date(today.getFullYear(), today.getMonth(), 1);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookWithForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBookWithWhatsApp = () => {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toDateString();
    const message = `Hi Rizwan, I would like to book an appointment on ${dateStr} at ${selectedTime}.`;
    const phone = whatsappNumber || '1234567890'; // fallback
    const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#15120E] text-[#F9F7F2] font-sans selection:bg-[#E59500] selection:text-[#15120E]">
      
      {/* SIMPLE NAVBAR */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-4 backdrop-blur-md bg-[#15120E]/80 border-b border-[#2C2419]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#F9F7F2] hover:text-[#E59500] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold tracking-wide">Back to Home</span>
          </Link>
          <div className="font-bold text-xl tracking-tight">
            Rizwan Saeed<span className="text-[#E59500]">.</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 space-y-24">
        
        {/* BOOKING WIDGET */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-[#2C2419] bg-[#231F17]"
        >
          {/* Left Side (Theme Accent) */}
          <div className="md:w-[40%] bg-[#E59500] text-[#15120E] p-8 flex flex-col items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5" />
            <div className="relative z-10 flex flex-col items-center w-full">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#15120E] shadow-xl mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" 
                  alt="Rizwan Saeed"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 uppercase text-center">Rizwan Saeed</h2>
              <div className="flex items-center gap-2 text-sm font-semibold mb-8 opacity-80">
                <div className="w-4 h-4 rounded-full border-2 border-[#15120E] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#15120E] rounded-full" />
                </div>
                <span>15 Min Discovery</span>
              </div>

              {/* Mini Calendar Header */}
              <div className="w-full flex items-center justify-between mb-6 bg-[#15120E] text-[#F9F7F2] rounded-xl px-4 py-3">
                <button 
                  onClick={handlePrevMonth}
                  disabled={isPastMonth}
                  className={`transition-colors ${isPastMonth ? 'opacity-30 cursor-not-allowed' : 'hover:text-[#E59500] cursor-pointer'}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-bold text-sm tracking-wider uppercase">{monthNames[month]} {year}</span>
                <button onClick={handleNextMonth} className="hover:text-[#E59500] transition-colors cursor-pointer">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Mini Calendar Grid */}
              <div className="w-full">
                <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-bold opacity-70">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                  {padding.map((_, i) => (
                    <div key={`pad-${i}`} className="p-2" />
                  ))}
                  {days.map(d => {
                    const dateObj = new Date(year, month, d);
                    const isPast = dateObj < today;
                    const isSelected = selectedDate && dateObj.getTime() === selectedDate.getTime();

                    return (
                      <button 
                        key={d} 
                        onClick={() => handleDateClick(d)}
                        disabled={isPast}
                        className={`p-2 rounded-lg transition-all ${
                          isSelected 
                            ? 'bg-[#15120E] text-[#E59500] shadow-md' 
                            : isPast
                              ? 'opacity-30 cursor-not-allowed'
                              : 'hover:bg-[#15120E]/20 cursor-pointer'
                        }`}
                      >
                        {d}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:w-[60%] p-8 lg:p-12 flex flex-col items-center justify-center min-h-[400px]">
            {selectedDate ? (
              <div className="w-full max-w-sm flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-[#F9F7F2] uppercase tracking-wide border-b border-[#2C2419] pb-4 mb-4">
                  Select Time for {monthNames[selectedDate.getMonth()].slice(0,3)} {selectedDate.getDate()}
                </h3>
                {['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'].map((time) => (
                  <button 
                    key={time} 
                    onClick={() => handleTimeClick(time)}
                    className={`w-full py-4 px-6 rounded-xl border transition-all font-bold tracking-wider text-sm flex items-center justify-between group cursor-pointer ${
                      selectedTime === time 
                        ? 'border-[#E59500] bg-[#E59500]/10 text-[#E59500]' 
                        : 'border-[#2C2419] bg-[#1C1712] hover:border-[#E59500] hover:bg-[#E59500] hover:text-[#15120E]'
                    }`}
                  >
                    <span>{time}</span>
                    {selectedTime === time ? (
                      <CheckCircle2 className="w-5 h-5 text-[#E59500]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    )}
                  </button>
                ))}

                <AnimatePresence>
                  {selectedTime && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-2"
                    >
                      <div className="p-5 bg-[#1C1712] border border-[#2C2419] rounded-2xl flex flex-col gap-3">
                        <p className="text-xs text-center text-[#A69D92] font-semibold mb-1 uppercase tracking-wider">How would you like to proceed?</p>
                        <button 
                          onClick={handleBookWithForm}
                          className="w-full py-3 bg-[#E59500] hover:bg-[#F1A417] text-[#15120E] font-black text-xs uppercase tracking-[0.1em] rounded-xl transition-all cursor-pointer"
                        >
                          Fill Contact Form
                        </button>
                        <button 
                          onClick={handleBookWithWhatsApp}
                          className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-[0.1em] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937 0 3.825-3.113 6.938-6.938 6.938z"/>
                          </svg>
                          WhatsApp Me
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            ) : (
              <div className="text-center text-[#A69D92]">
                <h3 className="text-2xl font-bold text-[#F9F7F2] uppercase tracking-wide mb-4">Select Time</h3>
                <p>Select a date first to view available time slots.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* CONTACT FORM SECTION */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              ref={formRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-center mb-12">
                Brief Your <span className="text-[#E59500]">Project</span>
              </h2>

              <div className="w-full bg-[#1C1712] border border-[#2C2419] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-[#A69D92] uppercase font-bold ml-1">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053]" />
                        <input 
                          type="text" 
                          required
                          placeholder="John Doe"
                          className="w-full bg-[#231F17] border border-[#3C3224] focus:border-[#E59500] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#F9F7F2] outline-none transition-all placeholder:text-[#6B6053]"
                        />
                      </div>
                    </div>

                    {/* Work Email */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-[#A69D92] uppercase font-bold ml-1">Work Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053]" />
                        <input 
                          type="email" 
                          required
                          placeholder="john@company.com"
                          className="w-full bg-[#231F17] border border-[#3C3224] focus:border-[#E59500] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#F9F7F2] outline-none transition-all placeholder:text-[#6B6053]"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-[#A69D92] uppercase font-bold ml-1">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053]" />
                        <input 
                          type="tel" 
                          required
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-[#231F17] border border-[#3C3224] focus:border-[#E59500] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#F9F7F2] outline-none transition-all placeholder:text-[#6B6053]"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-[#A69D92] uppercase font-bold ml-1">Company Name</label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053]" />
                        <input 
                          type="text" 
                          placeholder="Enterprise Inc."
                          className="w-full bg-[#231F17] border border-[#3C3224] focus:border-[#E59500] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#F9F7F2] outline-none transition-all placeholder:text-[#6B6053]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-[#A69D92] uppercase font-bold ml-1">Area of Interest</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053]" />
                      <select className="w-full bg-[#231F17] border border-[#3C3224] focus:border-[#E59500] rounded-xl py-3.5 pl-12 pr-10 text-sm text-[#F9F7F2] outline-none transition-all appearance-none cursor-pointer font-medium">
                        <option value="sales-funnels">High-Performance Sales Funnels</option>
                        <option value="e-commerce">E-Commerce & Shopify</option>
                        <option value="branding">Brand Identity & UI/UX</option>
                        <option value="cro">Conversion Rate Optimization</option>
                      </select>
                      <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053] pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-[#A69D92] uppercase font-bold ml-1">How can we help? *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#6B6053]" />
                      <textarea 
                        required
                        placeholder="Tell us about your revenue goals..."
                        rows={4}
                        className="w-full bg-[#231F17] border border-[#3C3224] focus:border-[#E59500] rounded-xl py-4 pl-12 pr-4 text-sm text-[#F9F7F2] outline-none transition-all placeholder:text-[#6B6053] resize-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full py-4 bg-[#E59500] hover:bg-[#F1A417] text-[#15120E] font-black text-sm uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-[#E59500]/20 hover:shadow-[#E59500]/40 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
                    >
                      Initiate Growth
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="text-center pt-2">
                    <p className="text-[9px] font-mono text-[#6B6053] tracking-[0.1em] uppercase">
                      Secure Data Protocol Active • Elite Tier Confidentiality
                    </p>
                  </div>

                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
INNER_EOF
