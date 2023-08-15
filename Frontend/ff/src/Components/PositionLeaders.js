import React, { useState, useEffect} from 'react';
import '../Styles/PositionLeaders.css';
import axios from 'axios';
import FadeIn from '../Components/FadeIn.js';

const PositionLeaders = () => {
  const [matrixData, setMatrixData] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');

  useEffect(() => {
    fetchData();
  }, [selectedPosition]);

  const fetchData = () => {
    const queryParams = {};
    if (selectedPosition) {
        queryParams.position = selectedPosition;
    }

    axios.get('http://localhost:5000/playerData', { params: queryParams })
    .then((response) => {
      setMatrixData(response.data);
    })
    .catch((error) => {
        console.error('Error fetching data:', error)
    });
  };

    // Filter matrixData based on the selectedPosition
    const filteredData = selectedPosition
    ? matrixData.filter((row) => row.position === selectedPosition)
    : matrixData;

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value);
  };

  return (
    <FadeIn>
        <div className="matrix-container">
            <div className="filter-container">
                <label className = "filter-label" htmlFor="positionFilter">Filter by Position:</label>
                <select
                id="positionFilter"
                value={selectedPosition}
                onChange={handlePositionChange}
                >
                <option value="">All</option>
                <option value="QB">QB</option>
                <option value="RB">RB</option>
                <option value="WR">WR</option>
                <option value="TE">TE</option>

                </select>
            </div>
        {selectedPosition && ( 
        <FadeIn>
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
                    <td className={row.PosRank2017 == null ? 'nogames' : row.PosRank2017.substring(2) < 13 ? 'positive' : 'negative'}>{row.PosRank2017}</td>
                    <td className={row.PosRank2018 == null ? 'nogames' : row.PosRank2018.substring(2) < 13 ? 'positive' : 'negative'}>{row.PosRank2018}</td>
                    <td className={row.PosRank2019 == null ? 'nogames' : row.PosRank2019.substring(2) < 13 ? 'positive' : 'negative'}>{row.PosRank2019}</td>
                    <td className={row.PosRank2020 == null ? 'nogames' : row.PosRank2020.substring(2) < 13 ? 'positive' : 'negative'}>{row.PosRank2020}</td>
                    <td className={row.PosRank2021 == null ? 'nogames' : row.PosRank2021.substring(2) < 13 ? 'positive' : 'negative'}>{row.PosRank2021}</td>
                    <td className={row.PosRank2022 == null ? 'nogames' : row.PosRank2022.substring(2) < 13 ? 'positive' : 'negative'}>{row.PosRank2022}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </FadeIn>
        )}
        </div>
    </FadeIn>
  );
};

export default PositionLeaders;
