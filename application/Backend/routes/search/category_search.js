const express = require('express');
const router = express.Router();
const db = require('../../DB');

// Search Listings by Category
router.get('/', async (req, res) => {
    const searchTerm = req.query.category; // will come after /api/category?category=...
    if (!searchTerm) {
        return res.status(400).json({ error: "Missing search term" });
    }

    try {

        const query = "SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE product.category LIKE ? AND listing.listing_status = 'Active'"
        const searchValue = `%${searchTerm}%`;
        const [results] = await db.query(query, searchValue);
        
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
                rating: row.rating,
                conditions: row.conditions,
                // image: row.image,
                vendor_id: row.vendor_id,
                thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
            };
        });

        res.json(listingsWithImages);
        }
        catch (err) {
            console.error("Database query failed:", err);
            res.status(500).json({ error: "Database query failed" });
        }
});

module.exports = router;