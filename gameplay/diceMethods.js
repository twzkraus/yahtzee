const display = {
  displayFace: (value) => {
    let counter = 0;
    let stringOfSpans = '';
    if (value > 3) {
      stringOfSpans += '<div class="column">';
    }
    counter = 0;
    while (counter < value) {
      // need to add columns for dice values 4, 5,  and 6--to stack the dots
      if (value > 3  && counter === Math.floor(value / 2)) {
        stringOfSpans += '</div><div class="column">';
      }
      // dice value 5 has 3 columns
      if (value === 5  && counter === 3) {
        stringOfSpans += '</div><div class="column">';
      }
      // for all dice, add dots
      stringOfSpans += '<span class="dot"></span>';
      counter++;
    }
    // close off last column if you have it
    if (value > 3) {
      stringOfSpans += '</div>';
    }
    return $('<div class="dice face' + value + '">' + stringOfSpans + '</div>');
  },
  getScoreOptions: (scoreOptions) => {
    let cleanTitles = {
      ones: 'Ones',
      twos: 'Twos',
      threes: 'Threes',
      fours: 'Fours',
      fives: 'Fives',
      sixes: 'Sixes',
      '3ok': 'Three of a Kind',
      '4ok': 'Four of a Kind',
      fullHouse: 'Full House',
      smallStraight: 'Small Straight',
      largeStraight: 'Large Straight',
      yahtzee: 'YAHTZEE',
      chance: 'Chance'
    };

    let sortableScores = [];
    for (let title in scoreOptions) {
      if (scoreOptions[title]) {
        sortableScores.push([title, scoreOptions[title]]);
      }
    }

    sortableScores.sort((a, b) => b[1] - a[1]);

    let sortedScoreOptions = {};
    sortableScores.forEach(item => sortedScoreOptions[item[0]] = item[1]);
    return sortedScoreOptions;
  }
};

const play = {
  rollDice: (n) => {
    let rolledDice = [];
    while (rolledDice.length < n) {
      rolledDice.push(Math.ceil(Math.random() * 6));
    }
    return rolledDice;
  },
  getAllScores: (hand) => {
    const possScores = {};
    const sortedHand = hand.slice(0).sort((a, b) => a - b);
    const keys = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes', '3ok', '4ok', 'fullHouse', 'smallStraight', 'largeStraight', 'yahtzee', 'chance'];
    // upper section
    keys.forEach(key => {
      possScores[key] = allScores[key](sortedHand);
    })
    return possScores;
  },
};

play.getAndDisplayScores = (hand) => {
  return display.getScoreOptions(play.getAllScores(hand));
}

const allScores = {
  'ones': (hand) => scoreHelpers.countForOne(hand, 1),
  'twos': (hand) => scoreHelpers.countForOne(hand, 2),
  'threes': (hand) => scoreHelpers.countForOne(hand, 3),
  'fours': (hand) => scoreHelpers.countForOne(hand, 4),
  'fives': (hand) => scoreHelpers.countForOne(hand, 5),
  'sixes': (hand) => scoreHelpers.countForOne(hand, 6),
  'chance': (hand) => scoreHelpers.sumAll(hand),
  '3ok': (hand) => scoreHelpers.includes3OfAKind(hand) ? scoreHelpers.sumAll(hand) : 0,
  '4ok': (hand) => scoreHelpers.includes4OfAKind(hand) ? scoreHelpers.sumAll(hand) : 0,
  'fullHouse': (hand) => scoreHelpers.includesFullHouse(hand) ? 25 : 0,
  'smallStraight': (hand) => scoreHelpers.includesSmallStraight(hand) ? 30 : 0,
  'largeStraight': (hand) => scoreHelpers.includesLargeStraight(hand) ? 40 : 0,
  'yahtzee': (hand) => scoreHelpers.includesYahtzee(hand) ? 50 : 0,
};

const scoreHelpers = {
  // For all methods: hand must be sorted first
  countForOne: (hand, num) => {
    let score = 0;
    hand.forEach(die => {
      if (die === num) {
        score += num;
      }
    });
    return score;
  },
  sumAll: (hand) => {
    return hand.reduce((a, b) => a + b);
  },
  includes3OfAKind: (hand) => {
    for (let i = 0; i < hand.length - 2; i++) {
      if (hand[i + 2] === hand[i]) {
        return true;
      }
    };
    return false;
  },
  includes4OfAKind: (hand) => {
    for (let i = 0; i < hand.length - 3; i++) {
      if (hand[i + 3] === hand[i]) {
        return true;
      }
    };
    return false;
  },
  includesSmallStraight: (hand) => {
    if (hand[0] > 3) {
      return false;
    }
    // count how many sequential
    let value = null;
    let sequential;
    hand.forEach(die => {
      if (!value || die - value === 1) {
        sequential = (sequential || 0) + 1;
      }
      value = die;
    });
    if (sequential >= 4) {
      return true;
    }
    return false;
  },
  includesLargeStraight: (hand) => {
    if (hand[4] - hand[0] !== 4) {
      return false;
    }

    for (let i = 0; i < hand.length - 1; i++) {
      if (hand[i + 1] - hand[i] !== 1) {
        return false;
      }
    }
    return true;
  },
  includesYahtzee: (hand) => {
    return hand[0] === hand[4];
  }

}

scoreHelpers.includesFullHouse = (hand) => {
  return scoreHelpers.includes3OfAKind(hand) && hand[0] === hand[1] && hand[3] === hand[4];
};

module.exports = { display, play };
