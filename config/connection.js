const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');

// Log connection status
mongoose.connection.once('open', () => {
    console.log('🌟 Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
});

module.exports = mongoose.connection;
