const express = require('express');
const router = express.Router();
const db = require('../DB');

// GET all listings
router.get('/', (req, res) => {
    db.query('SELECT * FROM listing', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET listing by ID
router.get('/:id', async (req, res) => {

    try {

    const [results] = await db.query('SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE listing.vendor_id = ?', [req.query.id]);

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
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });

    }//);
    // db.query('SELECT * FROM listing WHERE listing_id = ?', [req.params.id], (err, results) => {
    //     if (err) return res.status(500).json({ error: err });
    //     res.json(results[0]);
    // });
});

// POST a new listing
router.post('/', (req, res) => {
    const { listing_status, product_id, vendor_id, availability, price, discount, approval_status } = req.body;
    db.query(
        'INSERT INTO listing (listing_status, product_id, vendor_id, availability, price, discount, approval_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [listing_status, product_id, vendor_id, availability, price, discount, approval_status],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ listing_id: result.insertId });
        }
    );
});

// UPDATE a listing by ID
router.put('/:id', (req, res) => {
    const { listing_status, product_id, vendor_id, availability, price, discount, approval_status } = req.body;
    db.query(
        'UPDATE listing SET listing_status = ?, product_id = ?, vendor_id = ?, availability = ?, price = ?, discount = ?, approval_status = ? WHERE listing_id = ?',
        [listing_status, product_id, vendor_id, availability, price, discount, approval_status, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.sendStatus(204);
        }
    );
});

// DELETE a listing by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM listing WHERE listing_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;