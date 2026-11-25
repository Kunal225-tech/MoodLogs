require('dotenv').config();
const express = require('express');
const cors = require('cors');
const  connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const moodRoutes = require('./routes/moodRoutes');
const gratitudeRoutes = require('./routes/gratitudeRoutes');
const aiRoutes = require('./routes/aiRoutes');
const { initCronScheduler, sendDailyCheckinReminder } = require('./services/emailService');
const User = require('./models/user');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'MoodLogs Backend API',
    uptime: process.uptime()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/gratitude', gratitudeRoutes);
app.use('/api/ai', aiRoutes);

const { protect } = require('./middlewares/authMiddleware');

app.post('/api/email/test-reminder', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const result = await sendDailyCheckinReminder(user.email, user.name);
    res.json({
      success: true,
      message: 'Automated check-in reminder email dispatched successfully!',
      previewUrl: result.previewUrl
    });
  } catch (err) {
    console.error('Email dispatch error:', err);
    res.status(500).json({ message: 'Failed to send email reminder' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  initCronScheduler();
});
