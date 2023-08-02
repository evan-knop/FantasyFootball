import './App.css';
import './table.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Landing from './Landing';
import Layout from './Layout';
import PlayerProfiles from './Components/PlayerProfiles';

const App = () => {
  const [data, setData] = useState([]);

/*   useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []); */

  
  return (
  
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/PlayerProfiles" element={<PlayerProfiles />} />
      </Routes>
    </Layout>
  </BrowserRouter>
  )
    /*{ <div>
      <h1>Fantasy Football Data</h1>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Year</th>
            <th>Fantasy Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>
            <tr key={item.view_key}>
              <td>{item.player_name}</td>
              <td>{item.year}</td>
              <td>{item.ppr_total_points}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>}
  );*/
};

export default App;
