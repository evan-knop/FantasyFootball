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
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM total_stats LIMIT 50'; 
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
