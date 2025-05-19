const express = require('express');
const router = express.Router();
const db = require('../DB');
// GET all users
router.get('/', async (req, res) => {
    try {

        const [results] = await db.query('SELECT user_id, first_name, last_name, username, sfsu_email, registration_date, is_verified, image, is_courier, rating FROM user');
        
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

        const [results] = await db.query('SELECT user_id, first_name, last_name, username, sfsu_email, registration_date, is_verified, image, is_courier, rating FROM user WHERE user.user_id = ?', [req.params.id]);
        
        res.json(results);
    }
    catch (err){
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
    try {
        const fields = [
            'first_name',
            'last_name',
            'username',
            'password' ,
            'sfsu_email' ,
            'registration_date' ,
            'is_verified' ,
            'image',
            'is_courier'
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
    
        const sql = `UPDATE user SET ${updates.join(', ')} WHERE user_id = ?`;
        const [result] = await db.query(sql, values);
    
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'User not found or no changes made' });
        }
    
        res.status(200).json({ message: 'User updated successfully' });
    
      } catch (err) {
        console.error('Error during DB update:', err);
        res.status(500).json({ error: 'Database update failed'});
      }
    });

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
    db.query('DELETE FROM user WHERE user_id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.sendStatus(204);
    });
});

module.exports = router;
