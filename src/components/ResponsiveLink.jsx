import React, { useEffect, useState } from 'react';

const ResponsiveLink = ({ href, children }) => {
  const [isLinkEnabled, setIsLinkEnabled] = useState(true);

  useEffect(() => {
    const updateLinkState = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 920) {
        setIsLinkEnabled(false);
      } else {
        setIsLinkEnabled(true);
      }
    };

    updateLinkState();
    window.addEventListener('resize', updateLinkState);

    return () => {
      window.removeEventListener('resize', updateLinkState);
    };
  }, []);

  return (
    <a
      href={isLinkEnabled ? href : undefined}
      className="responsive-link"
      /*style={{
        pointerEvents: isLinkEnabled ? 'auto' : 'none',
        color: isLinkEnabled ? 'blue' : 'gray',
        cursor: isLinkEnabled ? 'pointer' : 'not-allowed',
      }}*/
      data-astro-reload
    >
      {children}
    </a>
  );
};

export default ResponsiveLink;