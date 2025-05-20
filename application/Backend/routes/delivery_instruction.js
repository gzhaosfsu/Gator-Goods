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
        const [results] = await db.query(
            `SELECT * 
              FROM delivery_instruction 
              WHERE delivery_id = ?`, [id]);
        if (results.length === 0) {
            // no such delivery_id
            return res.status(404).json({ message: "Delivery Instruction not found" });
        }
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// GET Delivery Instruction by buyer ID
router.get('/buyer/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query( 
            `SELECT delivery_instruction.*, product.thumbnail FROM delivery_instruction JOIN listing ON listing.listing_id = delivery_instruction.listing_id JOIN product ON product.product_id = listing.product_id WHERE delivery_instruction.buyer_id = ?`,
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ message: "Not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all delivery instructions that dont have couriers
router.get('/courier/unassigned', async (req, res) => { 
    try {  
        const [results] = await db.query('SELECT delivery_instruction.*, product.thumbnail FROM delivery_instruction JOIN listing ON listing.listing_id = delivery_instruction.listing_id JOIN product ON product.product_id = listing.product_id WHERE delivery_instruction.delivery_status = "Unassigned"');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all delivery instructions for a specific courier
router.get('/courier/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // run the query with the id in the parameter array
        const [rows] = await db.query(
            'SELECT * FROM delivery_instruction WHERE courier_id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.json([]);
        }

        // send back the full array of instructions
        res.json(rows);

    } catch (err) {
        console.error("Error fetching courier instructions:", err);
        res.status(500).json({ error: err.message });
    }
});

// POST a new Delivery Instruction
router.post('/', async (req, res) => {
    const {
        vendor_id, courier_id, buyer_id, product_id,
        pickup, dropoff, buyer_special_request,
        vendor_special_request, delivery_status, listing_id
    } = req.body;
    try {
    const [results] = await db.query(
        `INSERT INTO delivery_instruction (
          vendor_id, buyer_id,
          pickup, dropoff, buyer_special_request,
          vendor_special_request, delivery_status, listing_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [vendor_id, courier_id, buyer_id, product_id, pickup, dropoff,
            buyer_special_request, vendor_special_request, delivery_status, listing_id]
        );
            res.status(201).json({ delivery_id: results.insertId });
    } catch (err) {
        console.error("Error inserting delivery instruction:", err);
        res.status(500).json({ error: err.message });
        }
});

// POST a new Delivery Instruction after accepting
router.post('/request/accept/:id', async (req, res) => {
    const deliveryRequestId = req.params.id;
    const { pickup, vendor_special_request, delivery_status } = req.body;
  
    try {
      // Get info from delivery_request by ID
      const [requests] = await db.query(
        `SELECT * FROM delivery_request WHERE delivery_request_id = ?`,
        [deliveryRequestId]
      );
  
      if (requests.length === 0) {
        return res.status(404).json({ error: "Delivery request not found" });
      }

      
  
      const request = requests[0];

      console.log("Delivery request fetched:", request);
  
      // Insert into delivery_instruction
      const [results] = await db.query(
        `INSERT INTO delivery_instruction (
          vendor_id, buyer_id,
          pickup, dropoff, buyer_special_request,
          vendor_special_request, delivery_status, listing_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          request.vendor_id,
          request.buyer_id,
          pickup,
          request.dropoff,
          request.buyer_special_request,
          vendor_special_request,
          delivery_status,
          request.listing_id
        ]
      );

      // Update delivery_request status to Approved
      await db.query(
        `UPDATE delivery_request SET status = 'Approved' WHERE delivery_request_id = ?`,
        [deliveryRequestId]
      );
  
      res.status(201).json({ delivery_id: results.insertId });
    } catch (err) {
      console.error("Error inserting delivery instruction:", err);
      res.status(500).json({ error: err.message });
    }
  });

// UPDATE a Delivery Instruction by ID
router.put('/:id', async (req, res) => {
    try {
        const fields = [
            'vendor_id',
            'courier_id',
            'buyer_id',
            'product_id',
            'pickup',
            'dropoff',
            'quantity',
            'buyer_special_request',
            'vendor_special_request',
            'delivery_status'
        ];
    
        const updates = [];
        const values = [];
    
        // Building the SET
        fields.forEach(field => {
          if (req.body[field] !== undefined) {
            updates.push(`${field} = ?`);
            values.push(req.body[field]);
          }
        });
    
        if (updates.length === 0) {
          return res.status(400).json({ error: 'No fields provided for update' });
        }
    
        values.push(req.params.id); // Add the ID for the WHERE
    
        const sql = `UPDATE delivery_instruction SET ${updates.join(', ')} WHERE delivery_id = ?`;
        const [result] = await db.query(sql, values);
    
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Delivery Instruction not found or no changes made' });
        }
    
        res.status(200).json({ message: 'Delivery Instruction updated successfully' });
    
      } catch (err) {
        console.error('Error during DB update:', err);
        res.status(500).json({ error: 'Database update failed'});
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
