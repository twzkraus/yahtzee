/************************
DICE DISPLAY DEFINITIONS
************************/
var $body = $('body');
var $diceBox = $(".diceBox");
var $rolledDiceLocs = [];
var $dieFace = [null];
let isSelected = [false, false, false, false, false];
var makeFace = function(value) {
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
}

/************************
ROLL DICE
************************/
let rollDice = function(n) {
  let rolledDice = [];
  for (let i = 0; i < n; i++) {
    let thisDie = Math.ceil( Math.random() * 6);
    rolledDice.push(thisDie);
  }
  return rolledDice;
};

// display 1 die at a time
let renderDie = function(valRolled, dieLoc) {
  // valRolled: number of dice rolled
  // dieLoc: jquery identifier of location

  dieLoc.empty();
  makeFace(valRolled).appendTo(dieLoc);
};

let animateRoll = function(dieLoc) {
  console.log('animated loc: ' + dieLoc);
  renderDie(Math.ceil(Math.random() * 6), dieLoc);
  for (let i = 0; i < 25; i++) {
    setTimeout(function() {
      renderDie(Math.ceil(Math.random() * 6), dieLoc);
    }, Math.random() * 750);
  }
};

/************************
COMPUTE SCORE
************************/
let countForOneNum = function(hand, num) {
  let score = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i] === num) {
      score += num;
    }
  }
  return score;
};

let sumAll = function(hand) {
  return hand.reduce((a,b) => a + b);
};

// helper for small straight--checks whether difference between each element is 1.
let isSequential = function(list) {

};

let includes3OfAKind = function(hand) {
  // note: assumes hand is sorted.
  // take difference of elements two away from each other
  for (let i = 0; i < hand.length - 2; i++) {
    if (hand[i + 2] - hand[i] === 0) {
      return true;
    }
  }
  return false;
};

let includesFullHouse = function(hand) {
  // requires that 3ok is met--then first two and last two in hand must be pairs.
  return hand[0] === hand[1] && hand[3] === hand[4];
};

let includes4OfAKind = function(hand) {
  // note: assumes hand is sorted.
  for (let i = 0; i < hand.length - 3; i++) {
    if (hand[i + 3] - hand[i] === 0) {
      return true;
    }
  }
  return false;
};

let includesSmallStraight = function(hand) {
  // hand is sorted

  // possible for one number to be out of sequence-that is the allowance:
    // 2, 3, 3, 4, 5
    // 2, 2, 3, 4, 5
    // 1, 3, 4, 5, 6
  let singleAllowance = 0;
  for (let i = 0; i < hand.length - 1; i++) {
    if (hand[i + 1] - hand[i] !== 1) {
      singleAllowance++;
    }
    if (singleAllowance > 1) {
      return false;
    }
  }
  return true;
};

let includesLargeStraight = function(hand) {
  if (hand[4] - hand[0] !== 4) {
    return false;
  }

  for (let i = 0; i < hand.length - 1; i++) {
    if (hand[i + 1] - hand[i] !== 1) {
      return false;
    }
  }
  return true;
};

let includesYahtzee = function(hand) {
  return hand[0] === hand[4];
};

let scoreMe =  function(hand) {
  let possScores = {};
  // make a copy then sort it:
  // when I didn't slice, this line would sort allDice, which sorted the rendering.
  let sortedHand = hand.slice(0).sort();
  let validHands = [];
  let numberKeys = [null, 'ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];

  // 1-6:
  for (let i = 1; i <= 6 ; i++) {
    if (sortedHand.includes(i)) {
      possScores[numberKeys[i]] = countForOneNum(sortedHand, i);
    }
  }

  // 3 of a kind -- gatekeeper step. nests 4ok, full house, and yahtzee because somewhat inter-related.
  if (includes3OfAKind(sortedHand)) {
    possScores['3ok'] = sumAll(sortedHand);

    // full house
    if (includesFullHouse(sortedHand)) {
      possScores.fullHouse = 25;
    }

    // 4 of a kind
    if (includes4OfAKind(sortedHand)) {
      possScores['4ok'] = sumAll(sortedHand);

      // yahtzee
      if (includesYahtzee(sortedHand)) {
        possScores.yahtzee = 50;
      }
    }
  }

  // small straight?
  if (includesSmallStraight(sortedHand)) {
    possScores.smallStraight = 30;
  }

  // large straight?
  if (includesLargeStraight(sortedHand)) {
    possScores.largeStraight = 40;
  }

  // chance
  possScores.chance = sumAll(sortedHand);

  return possScores
};

/************************
DE-SELECT ALL DICE
************************/

let getSelection = function() {
  return isSelected;
}

let clearSelection = function() {
  isSelected = [false, false, false, false, false];
  for (let i = 0; i < 5; i++) {
    $rolledDiceLocs[i].css("background-color", "transparent");
  }
};

let countSelected = function() {
  let totalSelected = 0;
  for (let i = 0; i < 5; i++) {
    if (isSelected[i]) {
      totalSelected++;
    }
  }
  return totalSelected;
};

let rollDiceIfNotSelected = function(selection, givenHand) {
  let newDiceNeeded = 5 - countSelected();
  console.log('num dice re-rolled:' + newDiceNeeded);
  let newDiceRolled = rollDice(newDiceNeeded);
  let allDiceValues = givenHand;

  for (let i = 0; i < 5; i++) {
    if (!isSelected[i]) {
      animateRoll($('#diceLoc' + i));
      console.log('not selected die: ' + i);
      let thisNewDie = newDiceRolled.pop();
      allDiceValues[i] = thisNewDie;
    } else {
      allDiceValues[i] = givenHand[i];
    }
  }
  return allDiceValues;
};

/************************
SET TURN STATUS
************************/

let setStatus = function(status) {
  result = {};
  for (el in status) {
    result[el] = status[el];
  }
  return result;
}

/************************
TAKE A TURN
************************/

let takeTurn = function(turnStatus) {
  for (let i = 0; i < 5; i++) {
    $rolledDiceLocs[i] = $('#diceLoc' + i);
  }
  let hand = turnStatus.currentHand;
  let prevRolls = turnStatus.rollsMade;

  if (prevRolls === 0) {
    clearSelection();
  } else {
    isSelected = getSelection();
  }

  allDice = rollDiceIfNotSelected(isSelected, hand);

  // delay dice rendering a bit so it happens after rolling animation
  setTimeout(function() {
    for (let i = 0; i < 5; i++) {
        renderDie(allDice[i], $rolledDiceLocs[i]);
    }
    // console.log('this is having an issue-on third roll, dice get sorted and change their location. Could be a variable name issue.')
  }, 750);
  console.log(allDice);

  let nRollsNow = prevRolls + 1;

  let turnSummary = {
    rollsMade: nRollsNow,
    currentHand: allDice,
    currentSelection: isSelected
  };

  // if (nRollsNow === 3) {
  //   turnOver();
  // }

  return turnSummary;
};

/************************
SET TURN STATUS
************************/

let turnOver = function(finalHand) {
  console.log('your turn is over');
  scoreMe(finalHand);
}