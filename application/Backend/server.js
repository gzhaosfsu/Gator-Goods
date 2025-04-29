const express = require('express');
const cors = require('cors');
const db = require('./DB');

const buyerRoutes = require('./routes/buyer');
const courierRoutes = require('./routes/courier');
const deliveryInstructionsRoutes = require('./routes/delivery_instruction');
const deliveryRequestRoutes = require('./routes/delivery_request');
const messageRoutes = require('./routes/direct_message');
const listingRoutes = require('./routes/listing');
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');
const vendorRoutes = require('./routes/vendor');
const titleSearch = require('./routes/search/title_search');
const categorySearch = require('./routes/search/category_search');
const allSearch = require('./routes/search/all_search');
const combinedSearch = require('./routes/search/combined_search');
const login = require('./routes/login');
const register = require('./routes/register');

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/buyer', buyerRoutes);
app.use('/api/courier', courierRoutes);
app.use('/api/delivery_instruction', deliveryInstructionsRoutes);
app.use('/api/delivery_request', deliveryRequestRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/direct_message', messageRoutes)
app.use('/api/product', productRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/title', titleSearch);
app.use('/api/category', categorySearch);
app.use('/api/all', allSearch);
app.use('/api/combined', combinedSearch);
app.use('/api/login', login);
app.use('/api/register', register);


app.listen(3001, () => console.log('API running on port 3001'));

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