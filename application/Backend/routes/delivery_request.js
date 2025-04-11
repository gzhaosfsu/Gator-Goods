const express = require('express');
const router = express.Router();
const db = require('../server/DB');

// GET all Delivery Requests
router.get('/', (req, res) => {
    db.query('SELECT * FROM delivery_request', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET Delivery Request by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM delivery_request WHERE delivery_request_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// POST a new Delivery Request
router.post('/', (req, res) => {
    const { buyer_id, vendor_id, status, dropoff, listing_id } = req.body;
    db.query(
        'INSERT INTO delivery_request (buyer_id, vendor_id, status, dropoff, listing_id) VALUES (?, ?, ?, ?, ?)',
        [buyer_id, vendor_id, status, dropoff, listing_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ delivery_request_id: result.insertId });
        }
    );
});

// UPDATE a Delivery Request by ID
router.put('/:id', (req, res) => {
    const { buyer_id, vendor_id, status, dropoff, listing_id } = req.body;
    db.query(
        'UPDATE delivery_request SET buyer_id = ?, vendor_id = ?, status = ?, dropoff = ?, listing_id = ? WHERE delivery_request_id = ?',
        [buyer_id, vendor_id, status, dropoff, listing_id, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.sendStatus(204);
        }
    );
});

// DELETE a Delivery Request by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM delivery_request WHERE delivery_request_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;
