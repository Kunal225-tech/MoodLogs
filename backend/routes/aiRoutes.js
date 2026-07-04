const express = require('express');
const { chatWithAi, getMoodInsights } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/chat', protect, chatWithAi);

router.get('/insights', protect, getMoodInsights);

module.exports = router;
