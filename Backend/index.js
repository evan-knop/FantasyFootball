// index.js (Backend server)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'FANTASY_FOOTBALL',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Example API endpoint to fetch data from MySQL
app.get('/search', (req, res) => {
    const searchTerm = req.query.searchTerm;
    const query = `SELECT * FROM FANTASY_FOOTBALL.total_stats WHERE player_name LIKE ?`; 
    const searchTermParam = `%${searchTerm}%`;

    console.log("sT: " + req)
    console.log(searchTermParam)
    
  connection.query(query, [searchTermParam], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/suggestions/:value', (req, res) => {
    const value = req.params.value;
    // Query your database or other data source for suggestions based on the value
    // Example: 
    const query = `SELECT DISTINCT player_name FROM total_stats WHERE player_name LIKE ? LIMIT 5`
    const valueParam = `%${value}%`;

    connection.query(query, [valueParam], (err, results) => {
        if (err) {
          console.error('Database query error:', err);
          res.status(500).send('Error fetching suggestions');
        } else {
          const suggestions = results.map(row => row.player_name);
          res.json(suggestions);
        }
    });
});

app.get('/playerData/:playerName', (req, res) => {
    const playerName = req.params.playerName;
  
    // Query your database to fetch player data based on the player name
    const query = 'SELECT * FROM total_stats WHERE player_name = ? ORDER BY YEAR DESC';
  
    connection.query(query, [playerName], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error fetching player data');
      } else {
        const playerData = results; // Assuming you only expect one result
        res.json(playerData);
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
