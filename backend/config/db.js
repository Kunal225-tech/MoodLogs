const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/moodtracker';
        if (!process.env.MONGODB_URI) {
            console.warn('⚠️ WARNING: MONGODB_URI is not set in environment variables! Using local fallback.');
        }
        await mongoose.connect(uri);
        console.log('Connected to MongoDB successfully');
    }
    catch(err){
        console.error('Failed to connect to MongoDB:', err.message);
    }
}
module.exports = connectDB;