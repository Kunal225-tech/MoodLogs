const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { addGratitude, getGratitudes } = require('../controllers/gratitudeController');

router.post('/add', protect, addGratitude);
router.get('/', protect, getGratitudes);

module.exports = router;
