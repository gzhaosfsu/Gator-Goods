require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./DB');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
// Setup CORS based on environment
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ["https://server.gatorgoods.com", "http://100.26.194.201","https://sfsu.gatorgoods.com"]
    : ["http://localhost:3000"];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// Routes
app.use('/api/delivery_instruction', require('./routes/delivery_instruction'));
app.use('/api/delivery_request', require('./routes/delivery_request'));
app.use('/api/listing', require('./routes/listing'));
app.use('/api/direct_message', require('./routes/direct_message'));
app.use('/api/product', require('./routes/product'));
app.use('/api/review', require('./routes/review'));
app.use('/api/user', require('./routes/user'));
app.use('/api/title', require('./routes/search/title_search'));
app.use('/api/category', require('./routes/search/category_search'));
app.use('/api/all', require('./routes/search/all_search'));
app.use('/api/combined', require('./routes/search/combined_search'));
app.use('/api/login', require('./routes/login'));
app.use('/api/register', require('./routes/register'));

// Server listening
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// MySQL Database Connection

// db.connect(err => {
//     if (err) {
//         console.error("Database connection failed:", err.stack);
//         return;
//     }
//     console.log("Connected to MySQL Database.");
// });
// db.getConnection((err, connection) => {

//     console.log("Callback reached");
//     if (err) {
//       console.error('Error connecting to database:', err);
//     } else {
//       console.log('Successfully connected to the database!');
//       connection.release(); // release back to the pool
//     }
//   });

//   db.query('SELECT 1', (err, results) => {
//     if (err) {
//       console.error('Query failed:', err);
//     } else {
//       console.log('DB connection validated with test query!');
//     }
//   });
(async () => {
  try {
    console.log('Trying to connect to DB...');
    const [rows] = await db.execute('SELECT * FROM user WHERE sfsu_email = ?', ['gzhao@sfsu.edu']);
    console.log(rows);
    console.log('DB connection validated with test query!');
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
})();