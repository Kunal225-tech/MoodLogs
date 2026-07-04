# ✨ MoodLogs — AI-Powered Mood Tracking & Wellness Platform

An AI-powered full-stack MERN application that helps users track their emotions, discover mood patterns, receive AI-powered insights, and build healthy emotional habits through personalized wellness experiences.

🌐 **Live Demo:** https://mood-logs.vercel.app/

📂 **GitHub Repository:** https://github.com/Kunal225-tech/MoodLogs

---

# 📖 Overview

MoodLogs is a modern mental wellness platform built using the MERN stack. It combines mood tracking, AI assistance, analytics, personalized wellness experiences, and habit-building features into a single responsive application.

Users can log their daily moods, visualize emotional trends, interact with an AI companion, export reports, receive automated reminder emails, maintain daily streaks, and explore interactive wellness experiences tailored to their emotional state.

---

# 🚀 Features

## 🔐 Authentication

- Secure User Registration & Login
- JWT Authentication
- Password Hashing using Bcrypt
- Protected API Routes

---

## 😊 Mood Tracking

- Log Daily Mood
- Add Personal Notes
- Track Energy Level (1–10)
- View Mood History
- Delete Mood Entries

---

## 📊 Analytics Dashboard

- Interactive Mood Trend Charts
- AI Mood Pattern Analysis
- Daily Streak Tracking
- Mood History Timeline

---

## 🤖 AI Companion

- AI Chat Assistant powered by Google Gemini
- AI-generated Mood Insights
- Personalized Mood Pattern Analysis
- Local fallback responses when AI is unavailable

---

## 🧠 Personalized Wellness Experiences

MoodLogs goes beyond traditional mood tracking by providing personalized wellness experiences based on the user's emotional state.

Instead of only recording moods, the application guides users to interactive activities designed for their current emotion.

| Mood | Wellness Experience |
|------|----------------------|
| 😊 Happy | Gratitude Jar |
| 🙏 Grateful | Gratitude Jar |
| 😡 Angry | Guided Breathing & Calm Space |
| 😴 Tired | Comfort & Recharge Sanctuary |
| 😐 Bored | Movie Recommendations |
| 😌 Calm | Mindfulness Space |
| 😢 Sad | Emotional Support Experience |
| 😰 Anxious | Relaxation & Grounding Activities |

This personalized approach encourages healthy emotional habits while making mood tracking more engaging and meaningful.

---

## 📧 Daily Reminder System

MoodLogs helps users build a consistent journaling habit through automated reminders.

- Sends reminder emails every day at **8:00 PM**
- Reminds users who haven't logged their mood for the day
- Built using **Node-Cron** and **Nodemailer**

---

## 📄 Reports & Export

- Export Mood History as PDF
- Export Mood History as CSV
- Easy sharing of mood reports

---

## 🌙 Additional Features

- 🌗 Dark / Light Theme
- 🔥 Daily Streak Counter
- 📱 Fully Responsive Design
- 💻 Mobile-Friendly Interface
- ⚡ Fast & Modern User Experience

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt

---

## AI

- Google Gemini 2.5 Flash API

---

## Additional Tools

- Node-Cron
- Nodemailer
- Chart.js

---

# 📂 Project Structure

```text
MoodLogs/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── package.json
│
├── frontend/
│   └── mood-tracker-frontend/
│       ├── src/
│       ├── components/
│       ├── pages/
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Kunal225-tech/MoodLogs.git

cd MoodLogs
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=3000

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_email_app_password
```

Run the backend server.

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend/mood-tracker-frontend

npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend.

```bash
npm run dev
```

---

# 🔒 Security

- JWT Authentication
- Protected API Endpoints
- Password Hashing with Bcrypt
- Environment Variables
- MongoDB Atlas Cloud Database

---

# ☁️ Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 🎯 Future Improvements

- 📅 Calendar Heatmap
- 📈 Weekly & Monthly Mood Reports
- 🔔 Push Notifications
- 🔑 Google OAuth Login
- 📱 Mobile Application

---

# 👨‍💻 Developer

**Kunal Kishore**

GitHub: https://github.com/Kunal225-tech

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
