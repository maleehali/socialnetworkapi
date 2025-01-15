const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.get('/api', (req, res) => {
    res.send('Welcome to the Social Network API!');
});
