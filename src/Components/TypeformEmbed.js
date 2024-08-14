import React, { useEffect, useRef } from 'react';
import { createEmbed } from '@typeform/embed';

const TypeformEmbed = ({ url }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      createEmbed(containerRef.current, {
        url,
        container: containerRef.current,
        // You can add more options here
      });
    }
  }, [url]);

  return <div ref={containerRef} style={{ height: '500px' }}></div>;
};

export default TypeformEmbed;
