cat << 'INNER_EOF' > snippet_load3.txt
    if (configStr) {
      try {
        const config = JSON.parse(configStr);
        setWhatsappConfig({
          number: config.number || "",
          enableWhatsapp: config.enableWhatsapp !== false,
          enableForm: config.enableForm !== false,
          message: config.message || "Hi Rizwan, I would like to book an appointment on {date} at {time}."
        });
      } catch (e) {}
    }
    
    const fieldsStr = localStorage.getItem('rizwan_contact_fields');
INNER_EOF

sed -i -e '/if (configStr) {/,/const fieldsStr = localStorage.getItem('"'"'rizwan_contact_fields'"'"');/c\
'"$(cat snippet_load3.txt | tr '\n' '\r' | sed -e 's/\r/\\n/g')"'
' app/contact/page.tsx
