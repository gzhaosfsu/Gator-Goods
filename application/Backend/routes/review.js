const express = require('express');
const router = express.Router();
const db = require('../DB');

// GET all reviews
router.get('/', async(req, res) => {
    try {

        const [results] = await db.query('SELECT review.*, user.username FROM review JOIN user ON review.author_id = user.user_id');
        
        res.json(results);
    }
    catch {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET review by ID
router.get('/:id', async (req, res) => {

    try {

        const [results] = await db.query(`
            SELECT review.*, user.username 
            FROM review 
            JOIN user ON review.author_id = user.user_id 
            WHERE review.vendor_id = ?`, [req.params.id]);
    
        res.json(results);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    
    }
});

// POST a new review
router.post('/', async(req, res) => {
    const { author_id, vendor_id, rating, comment } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO review (author_id, vendor_id, rating, comment) VALUES (?, ?, ?, ?)',
            [author_id, vendor_id, rating, comment],
        )
        res.status(201).json({ review_id: result.insertId });

    } catch(err) {
        res.status(500).json({ error: err.message });
        
    }
   
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
