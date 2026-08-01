sed -i 's/const \[whatsappConfig, setWhatsappConfig\] = useState({ number: "", enableWhatsapp: true, enableForm: true });/const [whatsappConfig, setWhatsappConfig] = useState({ number: "", enableWhatsapp: true, enableForm: true, message: "Hi Rizwan, I would like to book an appointment on {date} at {time}." });/g' app/contact/page.tsx

cat << 'INNER_EOF' > snippet_load.txt
        setWhatsappConfig({
          number: config.number || "",
          enableWhatsapp: config.enableWhatsapp !== false,
          enableForm: config.enableForm !== false,
          message: config.message || "Hi Rizwan, I would like to book an appointment on {date} at {time}."
        });
INNER_EOF

sed -i -e '/setWhatsappConfig({/,/        });/c\
'"$(cat snippet_load.txt | tr '\n' '\r' | sed -e 's/\r/\\n/g')"'
' app/contact/page.tsx
