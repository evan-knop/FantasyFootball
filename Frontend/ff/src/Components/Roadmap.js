import React, { useState } from 'react';
import '../Styles/Roadmap.css';
import '../Styles/FadeIn.css'
import FadeIn from './FadeIn';

const Roadmap = () => {
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (sectionIndex) => {
    if (expandedSections.includes(sectionIndex)) {
      setExpandedSections(expandedSections.filter((index) => index !== sectionIndex));
    } else {
      setExpandedSections([...expandedSections, sectionIndex]);
    }
  };

  const roadmapData = [
    {
      title: 'Analysis Playground',
      description: 'DIY analysis playground to provide users with a self-service tool to gain new fantasy football insights.',
    },
    {
      title: 'Expanded Stats in Player Profile',
      description: 'Display even more statistics, such as weekly performances (updated weekly), College stats, etc..',
    },
    {
        title: 'Projections',
        description: 'Project upcoming season stats based on statistical models created using the data collected.'
    }
  ];

  return (
    <FadeIn>
        <div className="roadmap-container">
        <h1>Site Roadmap</h1>
        <div className="timeline">
            {roadmapData.map((feature, index) => (
            <div key={index} className={`timeline-item ${expandedSections.includes(index) ? 'expanded' : ''}`}>
                <h2 onClick={() => toggleSection(index)}>{feature.title}</h2>
                {expandedSections.includes(index) && <p>{feature.description}</p>}
            </div>
            ))}
        </div>
        </div>
    </FadeIn>
  );
};

export default Roadmap;
