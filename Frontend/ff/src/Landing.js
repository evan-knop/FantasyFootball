import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import './Components/PlayerProfiles.js'
import FadeIn from './Components/FadeIn.js';

const Landing = () => {
  return (
    <FadeIn>
        <div className="landing-page">
        <header>
            <h1>UnicornFF</h1>
            <p>Your Ultimate Playbook for Fantasy Football Success.</p>
        </header>
        <section className="features">   
            <div className="feature">
                <Link to="/PlayerProfiles">
                    <h2>Player Profiles</h2>
                    <p>Data on individual players. History back to 2017.</p>
                </Link>
            </div>
            <div className="feature">
                <Link to="/PositionLeaders">
                    <h2>Positional Leaders</h2>
                    <p>Insight into which players have had the most success over the last few years.</p>
                </Link>
            </div>
            <div className="feature">
            <h2>Analysis Playground (Coming soon!)</h2>
            <p>Filter, sort, and analyze fantasy data however you want using our data analysis playground!</p>
            </div>
        </section>
        <footer>
            <p>&copy; 2023 UnicornFF. All rights reserved.</p>
        </footer>
        </div>
    </FadeIn>
  );
};

export default Landing;
