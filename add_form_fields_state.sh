cat << 'INNER_EOF' > snippet_state.txt
  const [formFields, setFormFields] = useState([
    { id: 'name', type: 'text', label: 'Full Name *', placeholder: 'John Doe', required: true, icon: 'User', width: 'half' },
    { id: 'email', type: 'email', label: 'Work Email *', placeholder: 'john@company.com', required: true, icon: 'Mail', width: 'half' },
    { id: 'phone', type: 'tel', label: 'Phone Number *', placeholder: '+1 (555) 000-0000', required: true, icon: 'Phone', width: 'half' },
    { id: 'company', type: 'text', label: 'Company Name', placeholder: 'Enterprise Inc.', required: false, icon: 'Building', width: 'half' },
    { id: 'service', type: 'select', label: 'Area of Interest', options: 'High-Performance Sales Funnels, E-Commerce & Shopify, Brand Identity & UI/UX, Conversion Rate Optimization', required: false, icon: 'DollarSign', width: 'full' },
    { id: 'message', type: 'textarea', label: 'How can we help? *', placeholder: 'Tell us about your revenue goals...', required: true, icon: 'MessageSquare', width: 'full' }
  ]);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  
  const saveFormFields = (newFields: any) => {
    setFormFields(newFields);
    localStorage.setItem('rizwan_contact_fields', JSON.stringify(newFields));
  };
INNER_EOF

sed -i -e '2744r snippet_state.txt' app/page.tsx

cat << 'INNER_EOF' > snippet_load.txt
        safeLoad('rizwan_contact_fields', [
          { id: 'name', type: 'text', label: 'Full Name *', placeholder: 'John Doe', required: true, icon: 'User', width: 'half' },
          { id: 'email', type: 'email', label: 'Work Email *', placeholder: 'john@company.com', required: true, icon: 'Mail', width: 'half' },
          { id: 'phone', type: 'tel', label: 'Phone Number *', placeholder: '+1 (555) 000-0000', required: true, icon: 'Phone', width: 'half' },
          { id: 'company', type: 'text', label: 'Company Name', placeholder: 'Enterprise Inc.', required: false, icon: 'Building', width: 'half' },
          { id: 'service', type: 'select', label: 'Area of Interest', options: 'High-Performance Sales Funnels, E-Commerce & Shopify, Brand Identity & UI/UX, Conversion Rate Optimization', required: false, icon: 'DollarSign', width: 'full' },
          { id: 'message', type: 'textarea', label: 'How can we help? *', placeholder: 'Tell us about your revenue goals...', required: true, icon: 'MessageSquare', width: 'full' }
        ], setFormFields);
INNER_EOF

sed -i -e '/safeLoad('"'"'rizwan_admin_whatsapp'"'"'/r snippet_load.txt' app/page.tsx
