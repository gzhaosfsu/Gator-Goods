const express = require('express');
const router = express.Router();
const db = require('../DB');

// GET all messages
router.get('/', async (req, res) => {
    try {

        const [results] = await db.query('SELECT * FROM direct_message');
        
        res.json(results);
    }
    catch {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET message by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id; 

        const [results] = await db.query('SELECT direct_message.* FROM direct_message WHERE direct_message.sender_id = ? OR direct_message.receiver_id = ?', [userId, userId]);
        
        res.json(results);
    }
    catch {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET : by listing and sender 
router.get('/listing-sender/get', async (req, res) => {
    try {

        const [requests] = await db.query(
            'SELECT * FROM direct_message WHERE sender_id = ? AND listing_id = ?', [req.query.id, req.query.listing]
        );

        res.json(requests);
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new message
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    db.query('DELETE FROM direct_message WHERE message_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;
