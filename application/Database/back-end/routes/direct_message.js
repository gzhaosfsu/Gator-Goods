const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all messages
router.get('/', (req, res) => {
    db.query('SELECT * FROM direct_message', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET message by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM direct_message WHERE message_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// POST a new message
router.post('/', (req, res) => {
    const { sender_id, receiver_id, listing_id, content } = req.body;
    db.query(
        'INSERT INTO direct_message (sender_id, receiver_id, listing_id, content) VALUES (?, ?, ?, ?)',
        [sender_id, receiver_id, listing_id, content],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message_id: result.insertId });
        }
    );
});

// UPDATE a message by ID
router.put('/:id', (req, res) => {
    const { sender_id, receiver_id, listing_id, content } = req.body;
    db.query(
        'UPDATE direct_message SET sender_id = ?, receiver_id = ?, listing_id = ?, content = ? WHERE message_id = ?',
        [sender_id, receiver_id, listing_id, content, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.sendStatus(204);
        }
    );
});

// DELETE a message by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM direct_message WHERE message_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;
