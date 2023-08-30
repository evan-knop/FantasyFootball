import React, { useState, useEffect} from 'react';
import '../Styles/PlayerProfiles.css';
import axios from 'axios';
import FadeIn from '../Components/FadeIn.js';

function PlayerProfiles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [searchBoxTop, setSearchBoxTop] = useState(false);

  const handleInputChange = (value) => {
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(`/suggestions/${value}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  const handleSuggestionSelect = async (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSuggestions([]); //Clear suggestions once a selection is made
    setSearchBoxTop(true); //Move the search box to the top of the screen


    try {
      const response = await axios.get(`/playerData/${suggestion}`);
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
      setSearchBoxTop(false); // Move the search box back to the middle
    }
  }, [selectedSuggestion]);

  return (  
  <FadeIn>
    <div className={`PlayerProfiles ${searchBoxTop ? 'search-top' : 'search-middle'}`}>
      <div className="PlayerProfiles">
        <div className="search-bar">
          <input
            className="playerSearch"
            type="text"
            value={searchTerm}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search Player"
          />
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
        <table className="data-table">
        {selectedSuggestion && playerData && playerData[0].position !== "QB" && ( 
          <thead>
            <tr>
              <th>Year</th>
              <th>Team</th>
              <th>Games Played</th>
              <th>Receptions</th>
              <th>Total Yards</th>
              <th>Total TDs</th>
              <th>Fantasy Points</th>
              <th>Position Rank</th>
            </tr>
          </thead>  
          )}
        {selectedSuggestion && playerData && playerData[0].position === "QB" && ( 
          <thead>
            <tr>
              <th>Year</th>
              <th>Team</th>
              <th>Games Played</th>
              <th>Passing Yards</th>
              <th>Passing TDs</th>
              <th>Interceptions</th>
              <th>Fantasy Points</th>
              <th>Position Rank</th>
            </tr>
          </thead>  
          )}
          {selectedSuggestion && playerData && playerData[0].position !== "QB" && (
          <tbody>
            {playerData.map((item) => (
              <tr key={item.view_key}>
                <td>{item.year}</td>
                <td>{item.team}</td>
                <td>{item.games_played}</td>
                <td>{item.receptions}</td>
                <td>{item.total_yards}</td>
                <td>{item.total_tds}</td>               
                <td>{item.ppr_total_points}</td>
                <td className={item.half_ppr_pos_rank == null ? 'nogames' : item.half_ppr_pos_rank.substring(2) < 13 ? 'positive' : item.half_ppr_pos_rank.substring(2) >= 13 && item.half_ppr_pos_rank.substring(2) < 25 ? 'neutral' : 'negative'}>{item.half_ppr_pos_rank}</td>
              </tr>
            ))}
          </tbody> )}
          {selectedSuggestion && playerData && playerData[0].position === 'QB' &&(
          <tbody>
            {playerData.map((item) => (
              <tr key={item.view_key}>
                <td>{item.year}</td>
                <td>{item.team}</td>
                <td>{item.games_played}</td>
                <td>{item.passing_yards}</td>
                <td>{item.passing_tds}</td>  
                <td>{item.interceptions}</td>             
                <td>{item.ppr_total_points}</td>
                <td><img src={`data:image/jpeg;base64,${item.photo}`} alt="Image" /></td>
                <td className={item.half_ppr_pos_rank == null ? 'nogames' : item.half_ppr_pos_rank.substring(2) < 13 ? 'positive' : item.half_ppr_pos_rank.substring(2) >= 13 && item.half_ppr_pos_rank.substring(2) < 25 ? 'neutral' : 'negative'}>{item.half_ppr_pos_rank}</td>
              </tr>
            ))}
          </tbody> )}
        </table> 
      </div>
      <div>{playerData && (<img src={`data:image/jpeg;base64,${playerData.photo}`} alt="Image" />)}</div>
    </div>
  </FadeIn>
  );
          };

export default PlayerProfiles;
