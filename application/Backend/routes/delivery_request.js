const express = require('express');
const router = express.Router();
const db = require('../DB');

// GET all Delivery Requests
router.get('/', async (req, res) => {
    try {

        const [results] = await db.query('SELECT * FROM delivery_request');
        
        res.json(results);
    }catch {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET Delivery Request by Buyer ID
router.get('/buyer/:buyer_id', async (req, res) => {
    try {

        const [results] = await db.query(`SELECT delivery_request.*, listing.price, product.title, product.thumbnail, user.username FROM delivery_request 
            JOIN listing ON listing.listing_id = delivery_request.listing_id 
            JOIN product on product.product_id = listing.product_id
            JOIN user ON user.user_id = delivery_request.buyer_id  WHERE delivery_request.vendor_id = ? AND delivery_request.status = "Pending"`, [req.params.vendor_id]);

        const formatted = results.map(row => ({
            ...row,
            thumbnail: row.thumbnail
              ? `data:image/png;base64,${row.thumbnail.toString('base64')}`
              : null
          }));
      
          res.json(formatted);
        
    }catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET Delivery Request by Vendor ID
router.get('/vendor/:vendor_id', async (req, res) => {
    try {

        const [results] = await db.query(`SELECT delivery_request.*, listing.price, product.title, product.thumbnail, user.username FROM delivery_request 
            JOIN listing ON listing.listing_id = delivery_request.listing_id 
            JOIN product on product.product_id = listing.product_id
            JOIN user ON user.user_id = delivery_request.buyer_id  WHERE delivery_request.vendor_id = ? AND delivery_request.status = "Pending"`, [req.params.vendor_id]);

        const formatted = results.map(row => ({
            ...row,
            thumbnail: row.thumbnail
              ? `data:image/png;base64,${row.thumbnail.toString('base64')}`
              : null
          }));
      
          res.json(formatted);

    }catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET Buyer and Vendor Based on Delivery Request ID
router.get('/combined/:delivery_request_id', async (req, res) => {
    try {

        const [results] = await db.query(`SELECT buyer.buyer_id AS buyer_id,
                buyer.user_id AS buyer_user_id,
                vendor.vendor_id AS vendor_id,
                vendor.user_id AS vendor_user_id,
                vendor.rating AS vendor_rating
            FROM delivery_request 
            JOIN buyer ON delivery_request.buyer_id = buyer.buyer_id 
            JOIN vendor ON delivery_request.vendor_id = vendor.vendor_id 
            WHERE delivery_request.delivery_request_id = ?`, [req.query.delivery_request_id]);
        
        res.json(results);
    }catch {
        console.error(err);
        res.status(500).json({ error: 'Server error' });query
    }
});

// GET Delivery Requests by Title, no Title in delivery Requests tho??
router.get('/by-title', async (req, res) => {
    try {

        const [results] = await db.query(
            'SELECT * FROM delivery_request JOIN listing on delivery_request.listing_id = listing.listing_id JOIN product on listing.product_id = product.product_id WHERE product.title = ?',
            [req.query.title]);
        res.json(results);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET : by listing and buyer
router.get('/listing-buyer', async (req, res) => {
    try {

        const { userId, listingId } = req.query;

        const [requests] = await db.query(
            'SELECT * FROM delivery_request WHERE buyer_id = ? AND listing_id = ?',
            [userId, listingId]
        );

        res.json(requests);
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


// POST a new Delivery Request
router.post('/', async (req, res) => {
    const { buyer_id, vendor_id, status, dropoff, buyer_special_request, listing_id } = req.body;
    db.query(
        'INSERT INTO delivery_request (buyer_id, vendor_id, status, dropoff, buyer_special_request, listing_id) VALUES (?, ?, ?, ?, ?, ?)',
        [buyer_id, vendor_id, status, dropoff, buyer_special_request, listing_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ delivery_request_id: result.insertId });
        }
    );
});



// UPDATE a Delivery Request by ID
router.put('/:id', async (req, res) => {
    try {
        const fields = [
            'buyer_id',
            'vendor_id',
            'status',
            'dropoff',
            'buyer_special_request',
            'listing_id'
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
    
        const sql = `UPDATE delivery_request SET ${updates.join(', ')} WHERE delivery_request_id = ?`;
        const [result] = await db.query(sql, values);
    
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Request not found or no changes made' });
        }
    
        res.status(200).json({ message: 'Request updated successfully' });
    
      } catch (err) {
        console.error('Error during DB update:', err);
        res.status(500).json({ error: err.message });
      }
});

// DELETE a Delivery Request by ID
router.delete('/:id', async (req, res) => {
    db.query('DELETE FROM delivery_request WHERE delivery_request_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;
