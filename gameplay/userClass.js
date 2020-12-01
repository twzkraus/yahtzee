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

const valsToCats = {
  1: 'ones',
  2: 'twos',
  3: 'threes',
  4: 'fours',
  5: 'fives',
  6: 'sixes'
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

User.prototype.addScore = function(scoreObj, diceVals) {
  const key = Object.keys(scoreObj)[0];
  const score = scoreObj[key];
  if (key === 'bonusYahtzee') {
    this.handleBonusYahtzee(key, score, diceVals);
    console.log(`Jackpot! An extra ${scoreObj[key]} points were added for ${key}!`);
  } else if (!this.scores[key]) {
    this.addToSection(key, score);
    console.log(`score of ${this.scores[key]} for category ${key} has been added!`);
  } else {
    console.log(`FAIL: score not added. The user already has a value for ${key}`);
  }
};

User.prototype.changeName = function(value) {
  this.name = value;
};

User.prototype.addToSection = function(key, score) {
  this.scores[key] += score;
  if (categories[key] === 'upper') {
    this.upperScore += score;
    if (this.upperScore >= 63) {
      this.upperBonus = 35;
    }
  } else if (categories[key] === 'lower') {
    this.lowerScore += score;
  }
};

User.prototype.handleBonusYahtzee = function(key, score, vals) {
  if (key === 'bonusYahtzee' && score === 100) {
    this.addToSection(key, score);
    let val = vals[0];
    let cat = valsToCats[val];
    if (this.scores[cat] === null) {
      this.addToSection(cat, val * 5);
    } else {
      this.handleYahtzeeAsJoker();
    }
  }
};

User.prototype.handleYahtzeeAsJoker = function() {
  return {
    'fullHouse': 25,
    'smallStraight': 30,
    'largeStraight': 40,
  };
};

export default User;
