const express = require('express');
const path = require('path');
const app = express();
const db = require('../db/scores.js');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Express Server is listening on port ${PORT}`);
});

app.get('/api/scores', (req, res) => {
  db.read()
    .then(data => {
      res.send(data);
    })
});

app.get('/api/scores/top', (req, res) => {
  db.readTop(10)
    .then(result => {
      res.send(result);
    })
});

app.post('/api/scores', (req, res) => {
  db.create(req.body)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

app.delete('/api/scores', (req, res) => {
  db.delete(req.body.id)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(400);
    })
});
