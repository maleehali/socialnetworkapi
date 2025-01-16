const express = require('express');
const db = require('./config/connection'); // MongoDB connection
const routes = require('./routes');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Connect to MongoDB and start the server
db.once('open', () => {
    console.log('🌟 Successfully connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

// Handle MongoDB connection errors
db.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
});
