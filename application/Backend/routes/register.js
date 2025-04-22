const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../DB'); // MySQL connection pool
require('dotenv').config();

router.post('/register', async (req, res) => {
    const { firstName, lastName, username, sfsu_email, password, confirmPassword } = req.body;

    // 1. Enforce @sfsu.edu email
    if (!sfsu_email.toLowerCase().endsWith('@sfsu.edu')) {
        return res.status(400).json({ message: 'Email must end with @sfsu.edu' });
    }

    // 2. Passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords don't match" });
    }

    try {
        // 3. Check if email or username exists
        const [existing] = await db.execute(
            'SELECT * FROM user WHERE sfsu_email = ? OR username = ?',
            [sfsu_email, username]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: 'Email or username already exists' });
        }

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Insert user
        await db.execute(
            'INSERT INTO user (first_name, last_name, username, password, sfsu_email) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, username, hashedPassword, sfsu_email]
        );

        return res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

module.exports = router;
