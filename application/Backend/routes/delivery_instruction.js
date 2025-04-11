const express = require('express');
const router = express.Router();
const db = require('../server/DB');

// GET all Delivery Instructions
router.get('/', (req, res) => {
    db.query('SELECT * FROM delivery_instruction', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// GET Delivery Instruction by ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM delivery_instruction WHERE delivery_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

// POST a new Delivery Instruction
router.post('/', (req, res) => {
    const {
        vendor_id, courier_id, buyer_id, product_id,
        pickup, dropoff, quantity, buyer_special_request,
        vendor_special_request, delivery_status
    } = req.body;
    db.query(
        `INSERT INTO delivery_instruction (vendor_id, courier_id, buyer_id, product_id, pickup, dropoff,
         quantity, buyer_special_request, vendor_special_request, delivery_status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [vendor_id, courier_id, buyer_id, product_id, pickup, dropoff, quantity,
            buyer_special_request, vendor_special_request, delivery_status],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ delivery_id: result.insertId });
        }
    );
});

// UPDATE a Delivery Instruction by ID
router.put('/:id', (req, res) => {
    const {
        vendor_id, courier_id, buyer_id, product_id,
        pickup, dropoff, quantity, buyer_special_request,
        vendor_special_request, delivery_status
    } = req.body;
    db.query(
        `UPDATE delivery_instruction SET vendor_id = ?, courier_id = ?, buyer_id = ?, product_id = ?, pickup = ?, dropoff = ?,
         quantity = ?, buyer_special_request = ?, vendor_special_request = ?, delivery_status = ?
         WHERE delivery_id = ?`,
        [vendor_id, courier_id, buyer_id, product_id, pickup, dropoff, quantity,
            buyer_special_request, vendor_special_request, delivery_status, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.sendStatus(204);
        }
    );
});

// DELETE a Delivery Instruction by ID
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM delivery_instruction WHERE delivery_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;
