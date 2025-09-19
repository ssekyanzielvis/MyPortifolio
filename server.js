const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const data = req.body;
  let requests = [];
  if (fs.existsSync('requests.json')) {
    requests = JSON.parse(fs.readFileSync('requests.json'));
  }
  requests.push(data);
  fs.writeFileSync('requests.json', JSON.stringify(requests, null, 2));
  res.json({ status: 'success' });
});

// Try different ports if one is busy
function startServer(port) {
  app.listen(port)
    .on('listening', () => {
      console.log(`Server running on http://localhost:${port}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying next port...`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
}

startServer(PORT);
