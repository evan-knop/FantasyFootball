import React, { useState, useEffect} from 'react';
import '../Styles/PositionLeaders.css';
import axios from 'axios';
import FadeIn from '../Components/FadeIn.js';

const PositionLeaders = () => {
  const [matrixData, setMatrixData] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('http://localhost:5000/playerData').then((response) => {
      setMatrixData(response.data);
    });
  }, []);

  const years = Array.from(new Set(matrixData.map((item) => item.year))).sort();

  return (
    <div className="matrix-container">
      <table className="data-matrix">
        <thead>
          <tr>
            <th>Name</th>
            {years.map((year) => (
              <th key={year}>{year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrixData.map((row, index) => (
            <tr key={index}>
              <td>{row.player_name}</td>
              {years.map((year) => (
                <td key={year}>
                  {matrixData.find((item) => item.player_name === row.name && item.year === year)?.value || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionLeaders;
