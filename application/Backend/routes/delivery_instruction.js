const express = require('express');
const router = express.Router();
const db = require('../DB');

// GET all Delivery Instructions
router.get('/', async (req, res) => { 
    try {
        const [results] = await db.query('SELECT * FROM delivery_instruction');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET Delivery Instruction by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            `SELECT di.*, p.name AS product_name, p.condition, p.image_url
            FROM delivery_instruction di
            JOIN product p ON di.product_id = p.product_id
            WHERE di.delivery_id = ?`,
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ message: "Not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new Delivery Instruction
router.post('/', async (req, res) => {
    const {
        vendor_id, courier_id, buyer_id, product_id,
        pickup, dropoff, quantity, buyer_special_request,
        vendor_special_request, delivery_status
    } = req.body;
    try {
    const [results] = await db.query(
        `INSERT INTO delivery_instruction (vendor_id, courier_id, buyer_id, product_id, pickup, dropoff,
         quantity, buyer_special_request, vendor_special_request, delivery_status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [vendor_id, courier_id, buyer_id, product_id, pickup, dropoff, quantity,
            buyer_special_request, vendor_special_request, delivery_status]
        );
            res.status(201).json({ delivery_id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
        }
    });

// UPDATE a Delivery Instruction by ID
router.put('/:id', async (req, res) => {
    const {
        vendor_id, courier_id, buyer_id, product_id,
        pickup, dropoff, quantity, buyer_special_request,
        vendor_special_request, delivery_status
    } = req.body;
    try {
    await db.query(
        `UPDATE delivery_instruction SET vendor_id = ?, courier_id = ?, buyer_id = ?, product_id = ?, pickup = ?, dropoff = ?,
         quantity = ?, buyer_special_request = ?, vendor_special_request = ?, delivery_status = ?
         WHERE delivery_id = ?`,
        [vendor_id, courier_id, buyer_id, product_id, pickup, dropoff, quantity,
            buyer_special_request, vendor_special_request, delivery_status, req.params.id]
        );
        res.sendStatus(204);
    } catch (err) {
            res.status(500).json({ error: err });
 
        }
    });


// DELETE a Delivery Instruction by ID
router.delete('/:id', async (req, res) => { try {
    await db.query('DELETE FROM delivery_instruction WHERE delivery_id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });

module.exports = router;
