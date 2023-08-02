import React from 'react';
import { Link } from 'react-router-dom';

const PlayerProfiles = () => {
  return (
    <div>
      <h1>Player Profiles</h1>
      <div>
        {/* Link to the OtherPage */}
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
};

export default PlayerProfiles;