const express = require('express');
const router = express.Router();
const db = require('../DB');

// GET all vendors
router.get('/', (req, res) => {
    db.query('SELECT * FROM vendor', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET vendor by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM vendor WHERE vendor_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// POST a new vendor
router.post('/', (req, res) => {
    const { rating, image, user_id } = req.body;
    db.query(
        'INSERT INTO vendor (rating, image, user_id) VALUES (?, ?, ?)',
        [rating, image, user_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ vendor_id: result.insertId });
        }
    );
});

// UPDATE a vendor by ID
router.put('/:id', (req, res) => {
    const { rating, image, user_id } = req.body;
    db.query(
        'UPDATE vendor SET rating = ?, image = ?, user_id = ? WHERE vendor_id = ?',
        [rating, image, user_id, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.sendStatus(204);
        }
    );
});

// DELETE a vendor by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM vendor WHERE vendor_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;