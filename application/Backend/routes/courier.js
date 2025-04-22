const express = require('express');
const router = express.Router();
const db = require('../DB');

// GET all couriers
router.get('/', (req, res) => {
    db.query('SELECT * FROM courier', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET courier by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM courier WHERE courier_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// POST a new courier
router.post('/', (req, res) => {
    const { image, user_id, availability_status } = req.body;
    db.query(
        'INSERT INTO courier (image, user_id, availability_status) VALUES (?, ?, ?)',
        [image, user_id, availability_status],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ courier_id: result.insertId });
        }
    );
});

// UPDATE a courier by ID
router.put('/:id', (req, res) => {
    const { image, user_id, availability_status } = req.body;
    db.query(
        'UPDATE courier SET image = ?, user_id = ?, availability_status = ? WHERE courier_id = ?',
        [image, user_id, availability_status, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.sendStatus(204);
        }
    );
});

// DELETE a courier by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM courier WHERE courier_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;