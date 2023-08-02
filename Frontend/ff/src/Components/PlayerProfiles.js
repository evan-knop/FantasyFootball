import React, { useState, useEffect} from 'react';
import '../Styles/PlayerProfiles.css';
import axios from 'axios';

function PlayerProfiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [playerData, setPlayerData] = useState(null);


  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?searchTerm=${searchTerm}`);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(`http://localhost:5000/suggestions/${value}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  const handleSuggestionSelect = async (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSuggestions([]); // Clear suggestions once a selection is made

    try {
      const response = await axios.get(`http://localhost:5000/playerData/${suggestion}`);
      setPlayerData(response.data);
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!selectedSuggestion) {
      setPlayerData(null); // Clear player data when no suggestion is selected
    }
  }, [selectedSuggestion]);

  return (   
    <div className="PlayerProfiles">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Search Player"
        />
        {/* <button onClick={handleSearch}>Search</button> */}
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div key={index} className={`suggestion ${selectedSuggestion === suggestion ? 'selected' : ''}`}
            onClick={() => handleSuggestionSelect(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      </div>
      <div className="selected-data">
        {selectedSuggestion &&  (
          <div>
            <h1>{selectedSuggestion}</h1>
          </div>
        )}
      </div>
      <table>
      {selectedSuggestion && ( 
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Year</th>
            <th>Fantasy Points</th>
            <th>Total Yards</th>
            <th>Total TDs</th>
          </tr>
        </thead>  
        )}
        {selectedSuggestion && playerData && (
        <tbody>
          {playerData.map((item) => (
            <tr key={item.view_key}>
              <td>{item.player_name}</td>
              <td>{item.position}</td>
              <td>{item.year}</td>
              <td>{item.ppr_total_points}</td>
              <td>{item.total_yards}</td>
              <td>{item.total_tds}</td>
            </tr>
          ))}
        </tbody> )}
      </table> 
    </div>
  );
          };

export default PlayerProfiles;
