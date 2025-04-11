const express = require('express');
const router = express.Router();
const db = require('../server/DB');

// GET all products
router.get('/', (req, res) => {
    db.query('SELECT * FROM product', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET product by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM product WHERE product_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// POST a new product
router.post('/', (req, res) => {
    const { description, category, title, image, vendor_id } = req.body;
    db.query(
        'INSERT INTO product (description, category, title, image, vendor_id) VALUES (?, ?, ?, ?, ?)',
        [description, category, title, image, vendor_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ product_id: result.insertId });
        }
    );
});

// UPDATE a product by ID
router.put('/:id', (req, res) => {
    const { description, category, title, image, vendor_id } = req.body;
    db.query(
        'UPDATE product SET description = ?, category = ?, title = ?, image = ?, vendor_id = ? WHERE product_id = ?',
        [description, category, title, image, vendor_id, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.sendStatus(204);
        }
    );
});

// DELETE a product by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM product WHERE product_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;
