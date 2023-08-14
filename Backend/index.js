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

app.get('/playerData/', (req, res) => {
    // Query database to fetch player data
    const query = 'SELECT * FROM player_rankings LIMIT 10;';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error fetching data');
      } else {
        const allData = results;
        res.json(allData);
      }
    });
  });

app.get('/suggestions/:value', (req, res) => {
    const value = req.params.value;
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
  
    // Query database to fetch player data based on the player name
    const query = 'SELECT * FROM total_stats WHERE player_name = ? ORDER BY YEAR DESC';
  
    connection.query(query, [playerName], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error fetching player data');
      } else {
        const playerData = results;
        res.json(playerData);
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
