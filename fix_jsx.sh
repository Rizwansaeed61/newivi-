cat << 'INNER_EOF' > snippet_jsx.txt
                        {!whatsappConfig.enableForm && !whatsappConfig.enableWhatsapp && (
                          <p className="text-xs text-center text-[#E59500]">Booking options are currently disabled.</p>
                        )}
INNER_EOF

sed -i -e '/{!whatsappConfig.enableForm && !whatsappConfig.enableWhatsapp && (/,/)}/c\
'"$(cat snippet_jsx.txt | tr '\n' '\r' | sed -e 's/\r/\\n/g')"'
' app/contact/page.tsx
