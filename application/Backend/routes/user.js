const express = require('express');
const router = express.Router();
const db = require('../server/DB');
// GET all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET user by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM user WHERE user_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// POST a new user
router.post('/', (req, res) => {
    const { first_name, last_name, username, password, sfsu_email, is_verified } = req.body;
    db.query(
        'INSERT INTO user (first_name, last_name, username, password, sfsu_email, is_verified) VALUES (?, ?, ?, ?, ?, ?)',
        [first_name, last_name, username, password, sfsu_email, is_verified],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ user_id: result.insertId });
        }
    );
});

// UPDATE a user by ID
router.put('/:id', (req, res) => {
    const { first_name, last_name, username, password, sfsu_email, is_verified } = req.body;
    db.query(
        'UPDATE user SET first_name = ?, last_name = ?, username = ?, password = ?, sfsu_email = ?, is_verified = ? WHERE user_id = ?',
        [first_name, last_name, username, password, sfsu_email, is_verified, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.sendStatus(204);
        }
    );
});

// DELETE a user by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM user WHERE user_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;
