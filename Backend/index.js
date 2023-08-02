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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
