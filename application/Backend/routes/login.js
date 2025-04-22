const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../DB');
require('dotenv').config();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Fetch user by email
        const [rows] = await db.execute('SELECT * FROM user WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        // 2. Compare password with bcrypt hash
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // 3. Create JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, username: user.username }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router;
