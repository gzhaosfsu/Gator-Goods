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
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM listing WHERE listing_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

module.exports = router;
