import React, { useEffect } from 'react';

const TranslateComponent = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,te,hi', // Restrict to English (en), Telugu (te), and Hindi (hi)
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL // Dropdown layout
        },
        'google_translate_element'
      );
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div id="google_translate_element">""</div>
  );
};




export default TranslateComponent;
