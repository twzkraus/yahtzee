var User = function(name) {
  this.name = name;
  this.scores = {
    'ones': null,
    'twos': null,
    'threes': null,
    'fours': null,
    'fives': null,
    'sixes': null,
    '3ok': null,
    '4ok': null,
    'fullHouse': null,
    'smallStraight': null,
    'largeStraight': null,
    'yahtzee': null,
    'chance': null,
    'bonusYahtzee': null,
  }
}

User.prototype.getUpperScore = () => {
  let total = 0;
  let categories = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
  for (let key in this.scores) {
    if (categories.indexOf(key) >= 0) {
      total += this.scores[key];
    }
  }
  return total;
};

User.prototype.getLowerScore = () => {
  let total = 0;
  let categories =['3ok','4ok','fullHouse','smallStraight','largeStraight','yahtzee','chance','bonusYahtzee'];
  for (let key in this.scores) {
    if (categories.indexOf(key) >= 0) {
      total += this.scores[key];
    }
  }
  return total;
};

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
