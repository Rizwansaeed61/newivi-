cat << 'INNER_EOF' > snippet_form.txt
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
INNER_EOF

sed -i -e '/<div className="grid grid-cols-1 md:grid-cols-2 gap-6">/,/<\/textarea>\n                    <\/div>\n                  <\/div>/!b' \
     -e '/<\/textarea>\n                    <\/div>\n                  <\/div>/!d; /<\/textarea>\n                    <\/div>\n                  <\/div>/{r snippet_form.txt' -e 'd}' app/contact/page.tsx
