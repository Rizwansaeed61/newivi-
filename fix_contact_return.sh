cat << 'INNER_EOF' >> app/contact/page.tsx
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    let name = 'Unknown';
    let email = 'Unknown';
    let phone = 'Not provided';
    let company = 'Not provided';
    let service = 'General';
    let messageBody = '';
    
    const extras: string[] = [];
    
    formFields.forEach(field => {
      const val = formData.get(field.id)?.toString() || '';
      if (field.id === 'name' || field.label.toLowerCase().includes('name')) name = val || name;
      else if (field.id === 'email' || field.type === 'email') email = val || email;
      else if (field.id === 'phone' || field.type === 'tel') phone = val || phone;
      else if (field.id === 'company' || field.label.toLowerCase().includes('company')) company = val || company;
      else if (field.id === 'service' || field.type === 'select') service = val || service;
      else if (field.id === 'message' || field.type === 'textarea') messageBody = val || messageBody;
      else {
        if (val) extras.push(`${field.label}: ${val}`);
      }
    });

    if (extras.length > 0) {
      messageBody += (messageBody ? '\n\n' : '') + '--- Additional Info ---\n' + extras.join('\n');
    }
    
    const newInquiry = {
      id: Date.now(),
      name: name,
      email: email,
      phone: phone,
      company: company,
      service: service,
      budget: 'N/A',
      country: 'N/A',
      message: messageBody + (selectedDate ? `\n\n[Requested Appointment: ${selectedDate.toDateString()} at ${selectedTime}]` : ''),
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      read: false,
    };
    
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('rizwan_inquiries') || '[]');
      localStorage.setItem('rizwan_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));
    } catch (e) {}

    alert('Your message has been sent successfully. We will get back to you soon!');
    form.reset();
  };

  return (
    <div className="min-h-screen bg-[#100D09] text-[#F9F7F2] font-sans selection:bg-[#E59500] selection:text-[#15120E]">
      <nav className="w-full p-6 flex justify-between items-center absolute top-0 left-0 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-[#1C1712] border border-[#2C2419] flex items-center justify-center group-hover:border-[#E59500] transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#E59500]" />
          </div>
          <span className="font-bold tracking-widest uppercase text-xs">Back</span>
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-24 space-y-24">
        {/* BOOKING WIDGET */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-[#2C2419] bg-[#231F17]"
        >
          <div className="md:w-[40%] bg-[#E59500] text-[#15120E] p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <h2 className="text-2xl font-bold tracking-tight mb-2 uppercase text-center">Rizwan Saeed</h2>
            <p className="text-sm font-medium opacity-80 text-center mb-8">Strategic Consultant</p>
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15120E]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">30 Min Strategy Call</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#15120E]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Project Discovery</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-[60%] p-8 bg-[#1C1712]">
            <h3 className="text-lg font-bold mb-6 text-[#F9F7F2]">Select a Date & Time</h3>
            <div className="grid grid-cols-7 gap-2 mb-6">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="text-center text-xs font-bold text-[#A69D92]">{d}</div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`aspect-square rounded-full flex items-center justify-center text-sm transition-all ${
                      isSelected ? 'bg-[#E59500] text-[#15120E] font-bold' : 'hover:bg-[#2C2419] text-[#F9F7F2]'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            
            {selectedDate && (
              <div className="space-y-4 animate-fadeIn">
                <h4 className="text-sm font-bold text-[#F9F7F2]">Available Times</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                        selectedTime === time 
                          ? 'bg-[#E59500] text-[#15120E] border-[#E59500]' 
                          : 'bg-[#231F17] text-[#F9F7F2] border-[#2C2419] hover:border-[#E59500]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && selectedTime && (
              <div className="mt-8 space-y-4 animate-fadeIn">
                {whatsappConfig.enableWhatsapp && (
                  <button
                    onClick={handleBookWithWhatsApp}
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Book via WhatsApp
                  </button>
                )}
                {whatsappConfig.enableForm && (
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                    className="w-full py-4 bg-[#E59500] hover:bg-[#F1A417] text-[#15120E] font-black text-sm uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
                  >
                    Proceed to Form
                  </button>
                )}
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
                <form className="space-y-6 relative z-10" onSubmit={handleContactSubmit}>
                  
                  <div className="flex flex-wrap gap-y-6 -mx-3">
                    {formFields.map((field) => (
                      <div key={field.id} className={`px-3 ${field.width === 'half' ? 'w-full md:w-1/2' : 'w-full'}`}>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono tracking-widest text-[#A69D92] uppercase font-bold ml-1">
                            {field.label}
                          </label>
                          <div className="relative">
                            {field.icon === 'User' && <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053]" />}
                            {field.icon === 'Mail' && <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053]" />}
                            {field.icon === 'Phone' && <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053]" />}
                            {field.icon === 'Building' && <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053]" />}
                            {field.icon === 'DollarSign' && <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053]" />}
                            {field.icon === 'MessageSquare' && <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#6B6053]" />}
                            
                            {field.type === 'textarea' ? (
                              <textarea
                                name={field.id}
                                required={field.required}
                                placeholder={field.placeholder}
                                rows={4}
                                className="w-full bg-[#231F17] border border-[#3C3224] focus:border-[#E59500] rounded-xl py-4 pl-12 pr-4 text-sm text-[#F9F7F2] outline-none transition-all placeholder:text-[#6B6053] resize-none"
                              ></textarea>
                            ) : field.type === 'select' ? (
                              <>
                                <select 
                                  name={field.id}
                                  required={field.required}
                                  className="w-full bg-[#231F17] border border-[#3C3224] focus:border-[#E59500] rounded-xl py-3.5 pl-12 pr-10 text-sm text-[#F9F7F2] outline-none transition-all appearance-none cursor-pointer font-medium"
                                >
                                  {field.options?.split(',').map((opt: string, i: number) => (
                                    <option key={i} value={opt.trim()}>{opt.trim()}</option>
                                  ))}
                                </select>
                                <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6053] pointer-events-none" />
                              </>
                            ) : (
                              <input 
                                type={field.type}
                                name={field.id}
                                required={field.required}
                                placeholder={field.placeholder}
                                className="w-full bg-[#231F17] border border-[#3C3224] focus:border-[#E59500] rounded-xl py-3.5 pl-12 pr-4 text-sm text-[#F9F7F2] outline-none transition-all placeholder:text-[#6B6053]"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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
