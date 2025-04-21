const express = require('express');
const router = express.Router();
const db = require('../server/DB');

// Search for all Listings
router.get('/', async (req, res) => {
    try {
        const query = " SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE listing.listing_status = 'Active'"
        const [results] = await db.query(query);
        // db.query(query, (err, results) => {
        //     if (err) {
        //         console.error("Database query failed:", err);
        //         return res.status(500).json({ error: "Database query failed" });
        //     }


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
        // });
    }
    catch (err) {
        console.error("Database query failed:", err);
        res.status(500).json({ error: "Database query failed" });
    }
}); 

module.exports = router;