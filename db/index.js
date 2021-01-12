const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yahtzee', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('connected to MongoDB');
});

module.exports = db;
