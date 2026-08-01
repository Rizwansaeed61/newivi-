cat << 'INNER_EOF' > snippet_state_fields.txt
  const [formFields, setFormFields] = useState<any[]>([]);
INNER_EOF

sed -i -e '16r snippet_state_fields.txt' app/contact/page.tsx

cat << 'INNER_EOF' > snippet_load_fields.txt
    const fieldsStr = localStorage.getItem('rizwan_contact_fields');
    if (fieldsStr) {
      try {
        setFormFields(JSON.parse(fieldsStr));
      } catch (e) {}
    } else {
      setFormFields([
        { id: 'name', type: 'text', label: 'Full Name *', placeholder: 'John Doe', required: true, icon: 'User', width: 'half' },
        { id: 'email', type: 'email', label: 'Work Email *', placeholder: 'john@company.com', required: true, icon: 'Mail', width: 'half' },
        { id: 'phone', type: 'tel', label: 'Phone Number *', placeholder: '+1 (555) 000-0000', required: true, icon: 'Phone', width: 'half' },
        { id: 'company', type: 'text', label: 'Company Name', placeholder: 'Enterprise Inc.', required: false, icon: 'Building', width: 'half' },
        { id: 'service', type: 'select', label: 'Area of Interest', options: 'High-Performance Sales Funnels, E-Commerce & Shopify, Brand Identity & UI/UX, Conversion Rate Optimization', required: false, icon: 'DollarSign', width: 'full' },
        { id: 'message', type: 'textarea', label: 'How can we help? *', placeholder: 'Tell us about your revenue goals...', required: true, icon: 'MessageSquare', width: 'full' }
      ]);
    }
INNER_EOF

sed -i -e '/setWhatsappConfig({/,/        });/!b' -e '/        });/!d; /        });/r snippet_load_fields.txt' app/contact/page.tsx
