const express = require('express');
const router = express.Router();
const db = require('../DB');
// GET all users
router.get('/', async (req, res) => {
    try {

        const [results] = await db.query('SELECT * FROM user');
        
        res.json(results);
    }
    catch {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {

        const [results] = await db.query('SELECT user.* FROM user WHERE user.user_id = ?', [req.query.id]);
        
        res.json(results);
    }
    catch {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new user
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    db.query('DELETE FROM user WHERE user_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;
