// backend/server.js
const path = require('path');
const express = require('express');

const { requestLogger } = require('./middlewares/logger');
const jokeRoutes = require('./routes/jokeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(requestLogger);

// Serve frontend (statisk)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API routes
app.use('/api/jokes', jokeRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// 404 for API
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}][INFO] Server kører på http://localhost:${PORT}`);
});
