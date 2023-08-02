import React, { useState } from 'react';
import '../Styles/PlayerProfiles.css';
import axios from 'axios';

function PlayerProfiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);


  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?searchTerm=${searchTerm}`);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  return (   
    <div className="PlayerProfiles">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.view_key}>
              <td>{item.player_name}</td>
              <td>{item.position}</td>
              <td>{item.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerProfiles;
