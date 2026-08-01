cat << 'INNER_EOF' > snippet_message2.txt
                  <div className={`space-y-6 max-w-2xl pt-4 border-t border-[#2C2419]/50 transition-opacity duration-300 ${whatsappConfig.enableWhatsapp !== false ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-[#E59500] uppercase font-bold ml-1 block">WhatsApp Number</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Phone className="w-4 h-4 text-[#6B6053]" />
                        </div>
                        <input 
                          type="text" 
                          value={whatsappConfig.number || ''}
                          onChange={(e) => saveWhatsappConfig({ ...whatsappConfig, number: e.target.value })}
                          placeholder="+1234567890"
                          className="w-full max-w-sm bg-[#15120E] border border-[#2C2419] focus:border-[#E59500] rounded-xl py-3 pl-10 pr-4 text-sm text-[#F9F7F2] outline-none transition-all placeholder:text-[#6B6053]"
                        />
                      </div>
                      <p className="text-xs text-[#6B6053]">Include your country code (e.g., +1 for US, +91 for India, +92 for Pakistan).</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest text-[#E59500] uppercase font-bold ml-1 block">Pre-filled Message</label>
                      <textarea
                        value={whatsappConfig.message || ''}
                        onChange={(e) => saveWhatsappConfig({ ...whatsappConfig, message: e.target.value })}
                        placeholder="Hi Rizwan, I would like to book an appointment on {date} at {time}."
                        rows={3}
                        className="w-full bg-[#15120E] border border-[#2C2419] focus:border-[#E59500] rounded-xl py-3 px-4 text-sm text-[#F9F7F2] outline-none transition-all placeholder:text-[#6B6053] resize-none"
                      />
                      <p className="text-xs text-[#6B6053]">Use {'{date}'} and {'{time}'} placeholders to automatically insert the user's selected date and time.</p>
                    </div>
                  </div>
INNER_EOF

sed -i -e '/<div className={`space-y-2 max-w-sm pt-4 border-t border-\[#2C2419\]\/50 transition-opacity duration-300 ${whatsappConfig.enableWhatsapp !== false ? '"'"'opacity-100'"'"' : '"'"'opacity-40 pointer-events-none'"'"'}`>}/,/<p className="text-xs text-\[#6B6053\]">Include your country code (e.g., +1 for US, +91 for India, +92 for Pakistan).<\/p>\n                  <\/div>/c\
'"$(cat snippet_message2.txt | tr '\n' '\r' | sed -e 's/\r/\\n/g')"'
' app/page.tsx
