const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { getDbStatus } = require('../config/db');

const registerUser = async (req, res) => {
  try {
    const dbStatus = getDbStatus();
    if (!dbStatus.isConnected) {
      console.error('Registration failed: MongoDB is not connected.', dbStatus.error);
      return res.status(503).json({
        message: 'Database is not connected. Please verify MONGODB_URI in Render dashboard and check MongoDB Atlas Network Access (0.0.0.0/0).',
        details: dbStatus.error
      });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: cleanEmail });

    if (userExists) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword
    });
    await user.save();
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

const loginUser = async (req, res) => {
    try {
        const dbStatus = getDbStatus();
        if (!dbStatus.isConnected) {
            console.error('Login failed: MongoDB is not connected.', dbStatus.error);
            return res.status(503).json({
                message: 'Database is not connected. Please verify MONGODB_URI in Render dashboard and check MongoDB Atlas Network Access (0.0.0.0/0).',
                details: dbStatus.error
            });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const cleanEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: cleanEmail });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials. User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials. Incorrect password.' });
        }

        const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error during login', error: error.message });
    }
}

module.exports = { registerUser, loginUser };