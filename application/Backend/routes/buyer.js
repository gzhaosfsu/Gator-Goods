const express = require('express');
const router = express.Router();
const db = require('../server/DB');

// GET all buyers
router.get('/', (req, res) => {
    db.query('SELECT * FROM buyer', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET buyer by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM buyer WHERE buyer_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// POST a new buyer
router.post('/', (req, res) => {
    const { image, user_id } = req.body;
    db.query(
        'INSERT INTO buyer (image, user_id) VALUES (?, ?)',
        [image, user_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ buyer_id: result.insertId });
        }
    );
});

// UPDATE a buyer by ID
router.put('/:id', (req, res) => {
    const { image, user_id } = req.body;
    db.query(
        'UPDATE buyer SET image = ?, user_id = ? WHERE buyer_id = ?',
        [image, user_id, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.sendStatus(204);
        }
    );
});

// DELETE a buyer by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM buyer WHERE buyer_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;