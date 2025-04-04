require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to MySQL Database.");
});


// Search Listings by Title
app.get('/search.title', (req, res) => {
    const searchTerm = req.query.q; // will come after /search.category?q=...
    if (!searchTerm) {
        return res.status(400).json({ error: "Missing search term" });
    }

    const query = "SELECT * FROM listing WHERE product_id IN (SELECT product_id FROM product WHERE title LIKE ?)";
    const searchValue = `%${searchTerm}%`;

    const [rows] = db.query(query, [listingId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Listing not found" });
        }

        const listing = rows[0];

        // Convert BLOB (thumbnail) to Base64 if it exists
        if (listing.thumbnail) {
            listing.thumbnail = `data:image/png;base64,${listing.thumbnail.toString("base64")}`;
        }

        res.json(listing);
        // db.query(query, [searchValue], (err, results) => {
        // if (err) {
        //     console.error("Database query failed:", err);
        //     return res.status(500).json({ error: "Database query failed" });
        // }
        // res.json(results);
    });
// });


// Search Listings by Category
app.get('/category', (req, res) => {
    const searchTerm = req.query.q; // will come after /search.category?q=...
    if (!searchTerm) {
        return res.status(400).json({ error: "Missing search term" });
    }

    const query = "SELECT * FROM listing WHERE product_id IN (SELECT product_id FROM product WHERE category LIKE ?)";
    const searchValue = `%${searchTerm}%`;

    db.query(query, [searchValue], (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

// Search for all Listings
app.get('/search.all', (req, res) => {
    const query = ' SELECT * FROM listing'
    db.query(query, (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

/*        const [rows] = await db.query(query, [listingId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Listing not found" });
        }

        const listing = rows[0];

        // Convert BLOB (thumbnail) to Base64 if it exists
        if (listing.thumbnail) {
            listing.thumbnail = `data:image/png;base64,${listing.thumbnail.toString("base64")}`;
        }

        res.json(listing); */

