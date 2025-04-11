const express = require('express');
const router = express.Router();
const db = require('../server/DB');

// Search Listings by Category AND Title
router.get('/', (req, res) => {
    const category = req.query.category; // will come after /api/category?category=...
    const title = req.query.title; // ... then will come after &title=...
    if (!title && !category) {
        return res.status(400).json({ error: "Missing search terms" });
    }

    const query = "SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE product.category LIKE ? AND listing.listing_status = 'Active' AND product.title LIKE ?";

    const searchValues = [`%${category}%`, `%${title}%`];
    

    db.query(query, searchValues, (err, results) => {
        if (err) {
            console.error("Database query failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        

        const listingsWithImages = results.map(row => {
            const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;

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

module.exports = router;