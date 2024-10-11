import React, { useEffect, useState } from 'react';
import './TranslateComponent.css';

const TranslateComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.onerror = () => {
          console.error('Google Translate script failed to load');
          setLoading(false);
        };
        document.body.appendChild(script);
      } else {
        // If the script is already added, call the initialization function directly
        window.googleTranslateElementInit();
      }
    };

    const initGoogleTranslate = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,te,hi', // English, Telugu, Hindi
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
        setLoading(false);
      }
    };

    // Assign the initialization function to a global function for the script callback
    window.googleTranslateElementInit = initGoogleTranslate;

    // Load the script
    addGoogleTranslateScript();

    const scriptCheckInterval = setInterval(() => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        initGoogleTranslate();
        clearInterval(scriptCheckInterval);
      }
    }, 300); // Checking every 300ms

    return () => clearInterval(scriptCheckInterval);
  }, []);

  return (
    <div>
      {loading && <div>Loading translation options...</div>}
      <div id="google_translate_element" />
    </div>
  );
};

export default TranslateComponent;
