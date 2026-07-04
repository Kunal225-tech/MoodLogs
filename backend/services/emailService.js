const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require('../models/user');
const Mood = require('../models/mood');

let transporter = null;

async function getTransporter() {
  if (transporter) return transporter;

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    console.log(`📧 Nodemailer initialized with real SMTP: ${process.env.EMAIL_USER}`);
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log(`📧 Nodemailer initialized with Ethereal Test Account: ${testAccount.user}`);
  }
  return transporter;
}

async function sendDailyCheckinReminder(userEmail, userName) {
  try {
    const mailer = await getTransporter();
    
    const mailOptions = {
      from: '"MoodLogs AI Sanctuary" <notifications@moodlogs.ai>',
      to: userEmail,
      subject: '🌙 Daily Check-in Reminder: How are you feeling today?',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', -apple-system, sans-serif; background: #f5f5f4; margin: 0; padding: 40px 20px; color: #1c1917; }
            .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e7e5e4; }
            .header { background: #1c1917; padding: 30px; text-align: center; color: #ffffff; }
            .header h1 { font-size: 24px; margin: 0; font-weight: 700; letter-spacing: -0.02em; }
            .content { padding: 32px; line-height: 1.6; }
            .content h2 { font-size: 18px; color: #1c1917; margin-top: 0; }
            .content p { color: #57534e; font-size: 14px; }
            .cta-btn { display: inline-block; background: #f97316; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 600; font-size: 14px; margin: 20px 0; }
            .footer { background: #fafaf9; padding: 20px; text-align: center; font-size: 11px; color: #8a8581; border-top: 1px solid #e7e5e4; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MoodLogs AI Sanctuary</h1>
            </div>
            <div class="content">
              <h2>Hi ${userName || 'there'}, how was your day? 👋</h2>
              <p>
                Our automated evening server audit noticed that you haven't recorded your mood check-in today. 
              </p>
              <p>
                Taking just <strong>30 seconds</strong> to label your emotions protects your streak and helps our Mindful AI synthesize accurate CBT behavioral correlations for your monthly clinical reports.
              </p>
              <div style="text-align: center;">
                <a href="http://localhost:5173/dashboard" class="cta-btn">
                  Log Today's Mood Check-in →
                </a>
              </div>
              <p style="font-size: 12px; color: #a8a29e; margin-bottom: 0;">
                Protecting your emotional well-being, one check-in at a time.
              </p>
            </div>
            <div class="footer">
              Automated system notification dispatched by MoodLogs Node-Cron Engine · 24/7 Scheduler
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await mailer.sendMail(mailOptions);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log(`📨 Check-in Reminder dispatched to ${userEmail}. Message ID: ${info.messageId}`);
    if (previewUrl) {
      console.log(`🔗 Ethereal Email Preview URL: ${previewUrl}`);
    }
    return { success: true, messageId: info.messageId, previewUrl: previewUrl || null };
  } catch (error) {
    console.error('❌ Error sending Nodemailer email:', error);
    throw error;
  }
}

function initCronScheduler() {
  console.log('⏰ Initializing node-cron scheduler: Automated Evening Check-in Reminders [0 20 * * *]');
  
  cron.schedule('0 20 * * *', async () => {
    console.log('🌙 [CRON TRIGGERED] Executing automated daily evening mood audit...');
    try {
      const users = await User.find({});
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      for (const user of users) {
        if (!user.email) continue;
        const loggedToday = await Mood.findOne({
          userId: user._id,
          date: { $gte: todayStart }
        });

        if (!loggedToday) {
          console.log(`⏳ User ${user.email} has not logged today. Dispatching Nodemailer reminder...`);
          await sendDailyCheckinReminder(user.email, user.name);
        }
      }
    } catch (err) {
      console.error('❌ Cron job audit error:', err);
    }
  });
}

module.exports = {
  sendDailyCheckinReminder,
  initCronScheduler
};
