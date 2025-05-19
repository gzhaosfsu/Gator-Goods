const express = require('express');
const router = express.Router();
const db = require('../DB');

// GET all listings
router.get('/', async (req, res) => {
    try {

        const [results] = await db.query('SELECT listing.*, user.rating, user.username FROM listing JOIN user ON listing.vendor_id = user.user_id');
        
        res.json(results);
    }
    catch {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET listing by ID
router.get('/:id', async (req, res) => {

    try {

    const [results] = await db.query('SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE listing.listing_id = ?', [req.params.id]);

    const listingsWithImages = results.map(row => {
        const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;

        return {
            listing_id: row.listing_id,
            price: row.price,
            discount: row.discount,
            listing_date: row.listing_date,
            title: row.title,
            description: row.description,
            product_id: row.product_id,
            category: row.category,
            rating: row.rating,
            conditions: row.conditions,
            // image: row.image,
            vendor_id: row.vendor_id,
            thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
        };
    });
    res.json(listingsWithImages);
// });
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });

    }//);
    // db.query('SELECT * FROM listing WHERE listing_id = ?', [req.params.id], (err, results) => {
    //     if (err) return res.status(500).json({ error: err });
    //     res.json(results[0]);
    // });
});

// GET listing by vendor ID and active
router.get('/active/:id', async (req, res) => {

    try {

    const [results] = await db.query('SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE listing.vendor_id = ? AND listing.listing_status = ?', [req.params.id, 'Active']);

    const listingsWithImages = results.map(row => {
        const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;

        return {
            listing_id: row.listing_id,
            price: row.price,
            discount: row.discount,
            listing_date: row.listing_date,
            title: row.title,
            description: row.description,
            product_id: row.product_id,
            category: row.category,
            rating: row.rating,
            conditions: row.conditions,
            // image: row.image,
            vendor_id: row.vendor_id,
            thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
        };
    });
    res.json(listingsWithImages);
// });
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });

    }//);
    // db.query('SELECT * FROM listing WHERE listing_id = ?', [req.params.id], (err, results) => {
    //     if (err) return res.status(500).json({ error: err });
    //     res.json(results[0]);
    // });
});

// GET listing by Vendor ID
router.get('/vendor/:id', async (req, res) => {

    try {

    const [results] = await db.query('SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE listing.vendor_id = ?', [req.params.id]);

    const listingsWithImages = results.map(row => {
        const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;

        return {
            listing_id: row.listing_id,
            price: row.price,
            discount: row.discount,
            listing_date: row.listing_date,
            title: row.title,
            description: row.description,
            product_id: row.product_id,
            category: row.category,
            rating: row.rating,
            conditions: row.conditions,
            // image: row.image,
            vendor_id: row.vendor_id,
            thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
        };
    });
    res.json(listingsWithImages);
// });
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });

    }//);
    // db.query('SELECT * FROM listing WHERE listing_id = ?', [req.params.id], (err, results) => {
    //     if (err) return res.status(500).json({ error: err });
    //     res.json(results[0]);
    // });
});

// GET listing by Vendor ID that are marked as sold
router.get('/vendor/sold/:id', async (req, res) => {

  try {

  const [results] = await db.query('SELECT listing.*, product.* FROM listing JOIN product ON listing.product_id = product.product_id WHERE listing.vendor_id = ? AND listing.listing_status = "Sold"', [req.params.id]);

  const listingsWithImages = results.map(row => {
      const base64Thumbnail = row.thumbnail ? row.thumbnail.toString('base64') : null;

      return {
          listing_id: row.listing_id,
          price: row.price,
          discount: row.discount,
          listing_date: row.listing_date,
          title: row.title,
          description: row.description,
          product_id: row.product_id,
          category: row.category,
          rating: row.rating,
          conditions: row.conditions,
          // image: row.image,
          vendor_id: row.vendor_id,
          thumbnail: base64Thumbnail ? `data:thumbnail/png;base64,${base64Thumbnail}` : null
      };
  });
  res.json(listingsWithImages);
// });
  
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });

  }//);
  // db.query('SELECT * FROM listing WHERE listing_id = ?', [req.params.id], (err, results) => {
  //     if (err) return res.status(500).json({ error: err });
  //     res.json(results[0]);
  // });
});

// POST a new product listing
router.post('/', async (req, res) => {
  try {

    const {
      title,
      description,
      category,
      thumbnail,
      mimetype,
      price,
      conditions,
      vendor_id  // now passed from the frontend
    } = req.body;

    if (!vendor_id) {
      return res.status(400).json({ error: 'vendor_id is required' });
    }

    if (!thumbnail || !mimetype) {
      return res.status(400).json({ error: 'Thumbnail and mimetype are required' });
    }

    const thumbnailBuffer = Buffer.from(thumbnail, 'base64');

    // 1. Insert into product
    const [productResult] = await db.query(
      `INSERT INTO product (title, description, category, thumbnail, mimetype, vendor_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, category, thumbnailBuffer, mimetype, vendor_id]
    );

    const productId = productResult.insertId;

    // 2. Insert into listing
    const [listingResult] = await db.query(
      `INSERT INTO listing (product_id, vendor_id, availability, price, discount, conditions, listing_status, approval_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [productId, vendor_id, 'In Stock', price, 0.00, conditions, 'Active', 'Pending']
    );

    res.status(201).json({
      message: 'Listing created',
      listing_id: listingResult.insertId,
      product_id: productId
    });

  } catch (err) {
    console.error('Error during listing creation:', err);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

// POST an existing product listing
router.post('/existing', async (req, res) => {
  try {

    const {
      product_id,
      price,
      conditions,
      vendor_id  // now passed from the frontend
    } = req.body;

    if (!vendor_id) {
      return res.status(400).json({ error: 'vendor_id is required' });
    }

    const [listingResult] = await db.query(
      `INSERT INTO listing (product_id, vendor_id, availability, price, conditions)
       VALUES (?, ?, ?, ?, ?)`,
      [product_id, vendor_id, 'In Stock', price, conditions]
    );

    res.status(201).json({
      message: 'Listing created',
      listing_id: listingResult.insertId,
      product_id: product_id
    });

  } catch (err) {
    console.error('Error during listing creation:', err);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

  
  
  

// UPDATE a listing by ID
router.put('/:id', async (req, res) => {

    try {
        const fields = [
          'listing_status',
          'product_id',
          'vendor_id',
          'availability',
          'price',
          'discount',
          'approval_status'
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

        if (updates.availability == 'Out of Stock') updates.listing_status == 'Delisted';
    
        values.push(req.params.id); // Add the ID for the WHERE
    
        const sql = `UPDATE listing SET ${updates.join(', ')} WHERE listing_id = ?`;
        const [result] = await db.query(sql, values);
    
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Listing not found or no changes made' });
        }
    
        res.status(200).json({ message: 'Listing updated successfully' });
    
      } catch (err) {
        console.error('Error during DB update:', err);
        res.status(500).json({ error: err.message });
      }
    });

// DELETE a listing by ID
router.delete('/:id', async (req, res) => {

    try {
        const [results] = await db.query('DELETE FROM listing WHERE listing_id = ?', [req.params.id]);
    
        // checks if real deletes happened
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Listing not found' });
        }
    
        res.status(200).json({ message: 'Listing deleted successfully' });
    
      } catch (err) {
        console.error('Error during DB delete:', err);
        res.status(500).json({ error: err.message });
      }
    });

module.exports = router;