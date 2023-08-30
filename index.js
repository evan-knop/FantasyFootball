const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
console.log('dirname: ' + __dirname)
app.use(express.static(path.join(__dirname, 'Frontend/ff/build')));


// MySQL remote configuration  
const connection = mysql.createPool({
  host: 'x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'ocodf96j5psl63w2',
  password: 'sp56qfrb5yqhxg5o',
  database: 'xojsllvnlgwf8y03',
}); 

app.get('/playerData/', (req, res) => {

    const { playerName, position } = req.query

    let query = 'SELECT * FROM player_rankings';

    const queryParams = [];

    if(position) {
        query += ' WHERE position = ? AND PosRank2022 IS NOT NULL';
        queryParams.push(position);
    }

    query += ' ORDER BY CAST(SUBSTRING(PosRank2022, 3) AS UNSIGNED) LIMIT 30';

    connection.query(query, queryParams, (err, results) => {
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
    const query = 'SELECT ts.*, pi.photo FROM total_stats ts JOIN player_info pi ON pi.player_id = ts.player_id WHERE ts.player_name = ? ORDER BY ts.year DESC';
  
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

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'Frontend', 'ff', 'build', 'index.html'));
   });
 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


