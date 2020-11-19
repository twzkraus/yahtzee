var User = function(name) {
  this.name = name;
  this.scores = {
    'ones': null,
    'twos': null,
    'threes': null,
    'fours': null,
    'fives': null,
    'sixes': null,
    'chance': null,
    '3ok': null,
    '4ok': null,
    'fullHouse': null,
    'smallStraight': null,
    'largeStraight': null,
    'yahtzee': null,
  }
}

User.prototype.addScore = function(scoreObj) {
  const key = Object.keys(scoreObj);
  if (!this.scores[key]) {
    this.scores[key] = scoreObj[key];
    console.log(`score of ${this.scores[key]} for category ${key} has been added!`);
  } else {
    console.log(`FAIL: score not added. The user already has a value for ${key}`);
  }
};

export default User;
