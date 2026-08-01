cat << 'INNER_EOF' > snippet.txt
          {activeAdminTab === 'contact_settings' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#231F17]/30 border border-[#2C2419] p-6 rounded-3xl space-y-4">
                <div>
                  <h3 className="font-bold text-base text-[#F9F7F2]">Contact & WhatsApp Integration</h3>
                  <p className="text-xs text-[#A69D92] mt-1">Configure your WhatsApp phone number to receive messages directly from the booking widget on the contact page.</p>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-[#2C2419]">
                  <div className="space-y-2 max-w-sm">
                    <label className="text-[10px] font-mono tracking-widest text-[#E59500] uppercase font-bold ml-1 block">WhatsApp Number</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Phone className="w-4 h-4 text-[#6B6053]" />
                      </div>
                      <input 
                        type="text" 
                        value={whatsappConfig.number}
                        onChange={(e) => saveWhatsappConfig({ ...whatsappConfig, number: e.target.value })}
                        placeholder="+1234567890"
                        className="w-full bg-[#15120E] border border-[#2C2419] focus:border-[#E59500] rounded-xl py-3 pl-10 pr-4 text-sm text-[#F9F7F2] outline-none transition-all placeholder:text-[#6B6053]"
                      />
                    </div>
                    <p className="text-xs text-[#6B6053]">Include your country code (e.g., +1 for US, +91 for India, +92 for Pakistan). Leave blank to disable WhatsApp button.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
INNER_EOF
sed -i -e '/{activeAdminTab === '"'"'performance'"'"' && (() => {/r snippet.txt' app/page.tsx
