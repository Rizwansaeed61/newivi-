cat << 'INNER_EOF' > snippet_submit2.txt
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Default standard fields
    let name = 'Unknown';
    let email = 'Unknown';
    let phone = 'Not provided';
    let company = 'Not provided';
    let service = 'General';
    let messageBody = '';
    
    // Process all dynamic fields
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
      budget: 'N/A (From Calendar)',
      country: 'N/A',
      message: messageBody + (selectedDate ? `\n\n[Requested Appointment: ${selectedDate.toDateString()} at ${selectedTime}]` : ''),
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      read: false,
    };
INNER_EOF

sed -i -e '/const handleContactSubmit = (e: React.FormEvent) => {/,/      read: false,\n    };/c\
'"$(cat snippet_submit2.txt | tr '\n' '\r' | sed -e 's/\r/\\n/g')"'
' app/contact/page.tsx
