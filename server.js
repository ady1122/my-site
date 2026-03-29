require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// API routes — load serverless-style handlers from api/
app.post('/api/chat', async (req, res) => {
  const handler = require('./api/chat');
  await handler(req, res);
});

app.post('/api/generate-proposal', async (req, res) => {
  const handler = require('./api/generate-proposal');
  await handler(req, res);
});

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Fallback to index.html
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
