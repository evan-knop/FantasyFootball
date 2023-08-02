import React, { useEffect, useState } from 'react';
import '../Styles/FadeIn.css'; // Create this CSS file

const FadeIn = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return <div className={`fade-in ${isVisible ? 'visible' : ''}`}>{children}</div>;
};

export default FadeIn;
