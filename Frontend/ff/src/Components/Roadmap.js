import React from 'react';
import '../Styles/Roadmap.css'; 
import FadeIn from '../Components/FadeIn.js';


const Roadmap = () => {
  return (
    <FadeIn>
<div className="roadmap-container">
      <h1>Site Roadmap</h1>
      <div className="timeline">
        <div className="timeline-item">
          <h2>Feature 1</h2>
          <p>Description of Feature 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="timeline-item">
          <h2>Feature 2</h2>
          <p>Description of Feature 2 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </div>
    </FadeIn>
  );
};

export default Roadmap;
