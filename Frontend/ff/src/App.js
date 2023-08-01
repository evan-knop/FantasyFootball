import logo from './logo.svg';
import './App.css';
// src/App.js (React front end)

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>MySQL Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.columnName}</li> // Replace columnName with the appropriate column name in your table
        ))}
      </ul>
    </div>
  );
};

export default App;
