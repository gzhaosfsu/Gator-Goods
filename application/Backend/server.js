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
    ? ["https://gatorgoods.sfsu.edu", "http://100.26.194.201"]
    : ["http://localhost:3000"];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/buyer', require('./routes/buyer'));
app.use('/api/courier', require('./routes/courier'));
app.use('/api/delivery_instruction', require('./routes/delivery_instruction'));
app.use('/api/delivery_request', require('./routes/delivery_request'));
app.use('/api/listing', require('./routes/listing'));
app.use('/api/direct_message', require('./routes/direct_message'));
app.use('/api/product', require('./routes/product'));
app.use('/api/review', require('./routes/review'));
app.use('/api/user', require('./routes/user'));
app.use('/api/vendor', require('./routes/vendor'));
app.use('/api/title', require('./routes/search/title_search'));
app.use('/api/category', require('./routes/search/category_search'));
app.use('/api/all', require('./routes/search/all_search'));
app.use('/api/combined', require('./routes/search/combined_search'));
app.use('/api/login', require('./routes/login'));
app.use('/api/register', require('./routes/register'));

// Initialize Socket.IO handlers
require('./socket')(io);

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