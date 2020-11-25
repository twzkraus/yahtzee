const categories = {
  'ones': 'upper',
  'twos': 'upper',
  'threes': 'upper',
  'fours': 'upper',
  'fives': 'upper',
  'sixes': 'upper',
  '3ok': 'lower',
  '4ok': 'lower',
  'fullHouse': 'lower',
  'smallStraight': 'lower',
  'largeStraight': 'lower',
  'yahtzee': 'lower',
  'chance': 'lower',
  'bonusYahtzee': 'lower',
};

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
  };
  this.upperScore = 0;
  this.lowerScore = 0;
  this.upperBonus = 0;
}

User.prototype.getUpperScore = function() {
  return this.upperScore;
};

User.prototype.getLowerScore = function() {
  return this.lowerScore;
};

User.prototype.hasBonus = function() {
  return this.getUpperScore() >= 63;
};

User.prototype.getFullUpperScore = function() {
  return this.upperScore + this.upperBonus;
};

User.prototype.getTotalScore = function() {
  return this.getFullUpperScore() + this.getLowerScore();
};

User.prototype.addScore = function(scoreObj) {
  const key = Object.keys(scoreObj);
  const score = scoreObj[key];
  if (!this.scores[key]) {
    this.addToSection(key, score);
    console.log(`score of ${this.scores[key]} for category ${key} has been added!`);
  } else if (key[0] === 'bonusYahtzee') {
    this.addToSection(key, score);
    console.log(`Jackpot! An extra ${scoreObj[key]} points were added for ${key}!`);
  } else {
    console.log(`FAIL: score not added. The user already has a value for ${key}`);
  }
};

User.prototype.changeName = function(value) {
  this.name = value;
};

User.prototype.addToSection = function(key, score) {
  this.scores[key] = score;
  if (categories[key] === 'upper') {
    this.upperScore += score;
    if (this.upperScore >= 63) {
      this.upperBonus = 35;
    }
  } else if (categories[key] === 'lower') {
    this.lowerScore += score;
  }
};

export default User;
