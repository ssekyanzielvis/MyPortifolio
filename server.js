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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
