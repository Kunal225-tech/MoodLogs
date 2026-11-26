const mongoose = require('mongoose');

let dbError = null;

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            dbError = 'MONGODB_URI is not set in environment variables! Please configure it in your hosting platform dashboard.';
            console.error('⚠️ ' + dbError);
            return;
        }
        await mongoose.connect(uri);
        dbError = null;
        console.log('Connected to MongoDB successfully');
    }
    catch(err){
        dbError = err.message;
        console.error('Failed to connect to MongoDB:', err.message);
    }
}

const getDbStatus = () => {
    return {
        isConnected: mongoose.connection.readyState === 1,
        readyState: mongoose.connection.readyState,
        hasUri: !!process.env.MONGODB_URI,
        error: dbError
    };
};

module.exports = { connectDB, getDbStatus };