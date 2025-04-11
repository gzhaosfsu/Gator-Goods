const express = require('express');
const router = express.Router();
const db = require('../server/DB');

// GET all reviews
router.get('/', (req, res) => {
    db.query('SELECT * FROM review', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET review by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM review WHERE review_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// POST a new review
router.post('/', (req, res) => {
    const { author_id, vendor_id, rating, comment } = req.body;
    db.query(
        'INSERT INTO review (author_id, vendor_id, rating, comment) VALUES (?, ?, ?, ?)',
        [author_id, vendor_id, rating, comment],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ review_id: result.insertId });
        }
    );
});

// UPDATE a review by ID
router.put('/:id', (req, res) => {
    const { author_id, vendor_id, rating, comment } = req.body;
    db.query(
        'UPDATE review SET author_id = ?, vendor_id = ?, rating = ?, comment = ? WHERE review_id = ?',
        [author_id, vendor_id, rating, comment, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.sendStatus(204);
        }
    );
});

// DELETE a review by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM review WHERE review_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;
