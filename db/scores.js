require('./index.js');
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  name: String,
  yahtzees: Number,
  score: Number
});

const Score = mongoose.model('Score', scoreSchema);

const methods = {
  create: (name, yahtzees, score) => {
    return Score.create(name, yahtzees, score);
  },
  readOne: (name) => {
    return Score.find({ name });
  },
  readAll: () => {
    return Score.find({});
  },
  readTop: (n) => {
    return Score.find({}).
      limit(parseInt(n)).
      sort({ score: -1 });
  },
  delete: (id) => {
    return Score.deleteOne({ _id: id });
  }
};

methods.read = (name) => {
  if (name) {
    return methods.readOne(name);
  } else {
    return methods.readAll();
  }
};

module.exports = methods;
