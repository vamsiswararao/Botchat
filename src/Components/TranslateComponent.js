import React, { useEffect, useState } from 'react';
import './TranslateComponent.css'

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
        setLoading(false);
      }
    };

    const initGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,te,hi',
           
            defaultLanguage: 'en', // Set default language to English
          },
          'google_translate_element'
        );
        setLoading(false);
      }
    };

    window.googleTranslateElementInit = initGoogleTranslate;

    addGoogleTranslateScript();

    const scriptCheckInterval = setInterval(() => {
      if (window.google && window.google.translate) {
        initGoogleTranslate();
        clearInterval(scriptCheckInterval);
      }
    }, 200);

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