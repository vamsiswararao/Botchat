import React, { useEffect } from 'react';

const TranslateComponent = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      // Check if the script is already added to avoid adding it multiple times
      if (!document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
      }
    };

    const initGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,te,hi', // English, Telugu, and Hindi
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL, // Horizontal layout
          },
          'google_translate_element'
        );
      }
    };

    window.googleTranslateElementInit = initGoogleTranslate;

    addGoogleTranslateScript();

    // Check if the script is loaded and Google Translate is ready
    const scriptCheckInterval = setInterval(() => {
      if (window.google && window.google.translate) {
        initGoogleTranslate();
        clearInterval(scriptCheckInterval);
      }
    }, 500); // Check every 500ms

    // Cleanup interval on component unmount
    return () => clearInterval(scriptCheckInterval);
  }, []);

  return (
    <div id="google_translate_element" />
  );
};

export default TranslateComponent;
