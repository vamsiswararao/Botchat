import React, { useEffect, useState } from 'react';

const Translate = () => {
  const [language, setLanguage] = useState('en'); // Default language is English

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,te,hi', autoDisplay: false },
        'google_translate_element'
      );
    };

    addGoogleTranslateScript();
  }, []);

  // Function to change language when dropdown value changes
  const handleLanguageChange = (event) => {
    const languageCode = event.target.value;
    setLanguage(languageCode); // Update the selected language
    const googleTranslateFrame = document.querySelector('.goog-te-combo');
    if (googleTranslateFrame) {
      googleTranslateFrame.value = languageCode;
      googleTranslateFrame.dispatchEvent(new Event('change')); // Trigger change event
    }
  };

  return (
    <div>
      <h1>My Web Page</h1>
      <p>Hello everybody!</p>
      <p>Translate this page:</p>

      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="te">Telugu</option>
        <option value="hi">Hindi</option>
      </select>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <p>You can translate the content of this page by selecting a language in the dropdown.</p>
    </div>
  );
};

export default Translate;
