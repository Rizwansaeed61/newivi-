'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomScripts() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load custom script configuration from local storage
    const saved = localStorage.getItem('rizwan_custom_scripts');
    if (!saved) return;

    try {
      const config = JSON.parse(saved);
      if (!config) return;

      const {
        facebookPixel = '',
        googleAnalytics = '',
        googleTagHead = '',
        googleTagBody = '',
        customHeadCode = '',
        customFooterCode = ''
      } = config;

      // Helper function to dynamically inject and execute script elements from custom HTML
      const injectScriptHTML = (html: string, target: 'head' | 'body', className: string) => {
        // Clean up previous elements of this specific class to prevent duplication on route change or edit
        const previous = document.querySelectorAll(`.${className}`);
        previous.forEach(el => el.remove());

        if (!html || !html.trim()) return;

        // Create a wrapper container for parsing
        const container = document.createElement('div');
        container.className = className;
        container.style.display = 'none';
        container.innerHTML = html;

        // Extract script elements and copy them to trigger execution in browser
        const scriptElements = container.querySelectorAll('script');
        scriptElements.forEach(oldScript => {
          const newScript = document.createElement('script');
          
          // Copy all attributes
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          
          // Copy script content
          newScript.textContent = oldScript.textContent;
          
          // Replace old script with new script in the parsed container
          oldScript.parentNode?.replaceChild(newScript, oldScript);
        });

        // Also handle iframe/noscript elements (common in GTM and FB Pixel backup tags)
        const noscriptElements = container.querySelectorAll('noscript');
        noscriptElements.forEach(oldNoscript => {
          const newNoscript = document.createElement('noscript');
          newNoscript.innerHTML = oldNoscript.innerHTML;
          oldNoscript.parentNode?.replaceChild(newNoscript, oldNoscript);
        });

        if (target === 'head') {
          document.head.appendChild(container);
        } else {
          document.body.appendChild(container);
        }
      };

      // Inject custom codes
      injectScriptHTML(facebookPixel, 'head', 'custom-fb-pixel');
      injectScriptHTML(googleAnalytics, 'head', 'custom-google-analytics');
      injectScriptHTML(googleTagHead, 'head', 'custom-gtm-head');
      injectScriptHTML(googleTagBody, 'body', 'custom-gtm-body');
      injectScriptHTML(customHeadCode, 'head', 'custom-head-code');
      injectScriptHTML(customFooterCode, 'body', 'custom-footer-code');

    } catch (e) {
      console.error('Error executing custom scripts:', e);
    }
  }, [pathname]); // Re-run on pathname changes to ensure scripts fire if they hook on page views

  return null;
}
