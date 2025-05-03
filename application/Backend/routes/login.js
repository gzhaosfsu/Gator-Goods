const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../DB');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Fetch user by email
        const [rows] = await db.execute('SELECT * FROM user WHERE sfsu_email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        // 2. Compare password with bcrypt hash
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        res.json({
            message: 'Login successful',
            user: { user_id: user.user_id,
                username: user.username,
                sfsu_email: user.sfsu_email,
                first_name: user.first_name,
                last_name: user.last_name }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router;
