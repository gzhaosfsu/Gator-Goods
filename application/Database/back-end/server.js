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
app.get('/api/title', (req, res) => {
    const searchTerm = req.query.q; // will come after /api/title?q=...
    if (!searchTerm) {
        return res.status(400).json({ error: "Missing search term" });
    }

    const query = "SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE product.title LIKE ? AND listing.listing_status = 'Active'"
    const searchValue = `%${searchTerm}%`;

    db.query(query, [searchValue], (err, results) => { 
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }

        const listingsWithImages = results.map(row => {
            const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;
            console.log("Row image:", row.thumbnail);

            return {
                listing_id: row.listing_id,
                price: row.price,
                discount: row.discount,
                listing_date: row.listing_date,
                title: row.title,
                description: row.description,
                product_id: row.product_id,
                category: row.category,
                // image: row.image,
                vendor_id: row.vendor_id,
                thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
            };
        });
        res.json(listingsWithImages);
    });
});


// Search Listings by Category
app.get('/api/category', (req, res) => {
    const searchTerm = req.query.q; // will come after /api/category?q=...
    if (!searchTerm) {
        return res.status(400).json({ error: "Missing search term" });
    }

    const query = "SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE product.category LIKE ? AND listing.listing_status = 'Active'"
    const searchValue = `%${searchTerm}%`;

    db.query(query, [searchValue], (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }

        const listingsWithImages = results.map(row => {
            const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;
            console.log("Row image:", row.thumbnail);

            return {
                listing_id: row.listing_id,
                price: row.price,
                discount: row.discount,
                listing_date: row.listing_date,
                title: row.title,
                description: row.description,
                product_id: row.product_id,
                category: row.category,
                // image: row.image,
                vendor_id: row.vendor_id,
                thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
            };
        });

        res.json(listingsWithImages);
    });
});

// Search for all Listings
app.get('/api/all', (req, res) => {
    const query = " SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE listing.listing_status = 'Active'"
    db.query(query, (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }


        const listingsWithImages = results.map(row => {
            const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;
            console.log("Row image:", row.thumbnail);

            return {
                listing_id: row.listing_id,
                price: row.price,
                discount: row.discount,
                listing_date: row.listing_date,
                title: row.title,
                description: row.description,
                product_id: row.product_id,
                category: row.category,
                // image: row.image,
                vendor_id: row.vendor_id,
                thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
            };
        });
        res.json(listingsWithImages);
    });
});


