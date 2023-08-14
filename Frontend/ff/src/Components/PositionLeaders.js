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

  return (
    <div className="matrix-container">
      <table className="data-matrix">
        <thead>
          <tr>
            <th>Name</th>
            <th>2017</th>
            <th>2018</th>
            <th>2019</th>
            <th>2020</th>
            <th>2021</th>
            <th>2022</th>
          </tr>
        </thead>
        <tbody>
          {matrixData.map((row, index) => (
            <tr key={index}>
              <td>{row.player_name}</td>
              <td>{row.PosRank2017}</td>
              <td>{row.PosRank2018}</td>
              <td>{row.PosRank2019}</td>
              <td>{row.PosRank2020}</td>
              <td>{row.PosRank2021}</td>
              <td>{row.PosRank2022}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionLeaders;
