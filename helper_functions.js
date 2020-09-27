// UPDATE 9/27 FOR REACTIFY: I'M COMMENTING OUT THINGS AS I'M MOVING THEM TO DICEMETHODS.JS

/************************
DICE DISPLAY DEFINITIONS
************************/
var $body = $('body');
var $diceBox = $(".diceBox");
var $rolledDiceLocs = [];
var $dieFace = [null];
let isSelected = [false, false, false, false, false];
// // relocated to display.face()
// var makeFace = function(value) {
//   let counter = 0;
//   let stringOfSpans = '';
//   if (value > 3) {
//     stringOfSpans += '<div class="column">';
//   }
//   counter = 0;
//   while (counter < value) {
//     // need to add columns for dice values 4, 5,  and 6--to stack the dots
//     if (value > 3  && counter === Math.floor(value / 2)) {
//       stringOfSpans += '</div><div class="column">';
//     }
//     // dice value 5 has 3 columns
//     if (value === 5  && counter === 3) {
//       stringOfSpans += '</div><div class="column">';
//     }
//     // for all dice, add dots
//     stringOfSpans += '<span class="dot"></span>';
//     counter++;
//   }
//   // close off last column if you have it
//   if (value > 3) {
//     stringOfSpans += '</div>';
//   }
//   return $('<div class="dice face' + value + '">' + stringOfSpans + '</div>');
// }

/************************
ROLL, SHOW, AND ANIMATE DICE ROLLS
************************/
// // relocated to play.rollDice
// let rollDice = function(n) {
//   let rolledDice = [];
//   for (let i = 0; i < n; i++) {
//     let thisDie = Math.ceil( Math.random() * 6);
//     rolledDice.push(thisDie);
//   }
//   return rolledDice;
// };

// display 1 die
let renderDie = function(valRolled, dieLoc) {
  // valRolled: number of dice rolled
  // dieLoc: jquery identifier of location

  dieLoc.empty();
  makeFace(valRolled).appendTo(dieLoc);
};

let animateRoll = function(dieLoc) {
  renderDie(Math.ceil(Math.random() * 6), dieLoc);
  for (let i = 0; i < 25; i++) {
    setTimeout(function() {
      renderDie(Math.ceil(Math.random() * 6), dieLoc);
    }, Math.random() * 750);
  }
};

/************************
COMPUTE SCORE - Helpers for each type
************************/
// check hand for upper section scores
// let countForOneNum = function(hand, num) {
//   let score = 0;
//   _.each(hand, function(card) {
//     if (card === num) {
//       score += num;
//     }
//   });
//   return score;
// };

// let sumAll = function(hand) {
//   return hand.reduce((a,b) => a + b);
// };

// let includes3OfAKind = function(hand) {
//   // note: assumes hand is sorted.
//   // take difference of elements two away from each other
//   for (let i = 0; i < hand.length - 2; i++) {
//     if (hand[i + 2] - hand[i] === 0) {
//       return true;
//     }
//   }
//   return false;
// };

// let includesFullHouse = function(hand) {
//   // requires that 3ok is met--then first two and last two in hand must be pairs.
//   return hand[0] === hand[1] && hand[3] === hand[4];
// };

// let includes4OfAKind = function(hand) {
//   // note: assumes hand is sorted.
//   for (let i = 0; i < hand.length - 3; i++) {
//     if (hand[i + 3] - hand[i] === 0) {
//       return true;
//     }
//   }
//   return false;
// };

// let includesSmallStraight = function(hand) {
//   // hand is sorted

//   // possible for one number to be out of sequence-that is the allowance:
//     // 2, 3, 3, 4, 5
//     // 2, 2, 3, 4, 5
//     // 1, 3, 4, 5, 6
//     // Problem: 1, 2, 3, 5, 6, returns true (1 allowance)

//   let singleAllowance = 0;
//   for (let i = 0; i < hand.length - 1; i++) {
//     if (hand[i + 1] - hand[i] !== 1) {
//       singleAllowance++;
//     }
//     if (singleAllowance > 1) {
//       return false;
//     }
//   }
//   return true;
// };

// let includesLargeStraight = function(hand) {
//   if (hand[4] - hand[0] !== 4) {
//     return false;
//   }

//   for (let i = 0; i < hand.length - 1; i++) {
//     if (hand[i + 1] - hand[i] !== 1) {
//       return false;
//     }
//   }
//   return true;
// };

// let includesYahtzee = function(hand) {
//   return hand[0] === hand[4];
// };

/************************
COMPUTE SCORE - Overall hand logic
************************/

// let scoreMe =  function(hand) {
//   let possScores = {};
//   // make a copy then sort it:
//   let sortedHand = hand.slice(0).sort();
//   let validHands = [];
//   let numberKeys = [null, 'ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];

//   // 1-6:
//   for (let i = 1; i <= 6 ; i++) {
//     if (sortedHand.includes(i)) {
//       possScores[numberKeys[i]] = countForOneNum(sortedHand, i);
//     }
//   }

//   // 3 of a kind -- gatekeeper step. nests 4ok, full house, and yahtzee because somewhat inter-related.
//   if (includes3OfAKind(sortedHand)) {
//     possScores['3ok'] = sumAll(sortedHand);

//     if (includesFullHouse(sortedHand)) {
//       possScores.fullHouse = 25;
//     }

//     if (includes4OfAKind(sortedHand)) {
//       possScores['4ok'] = sumAll(sortedHand);

//       if (includesYahtzee(sortedHand)) {
//         possScores.yahtzee = 50;
//       }
//     }
//   }

//   if (includesSmallStraight(sortedHand)) {
//     possScores.smallStraight = 30;
//   }

//   if (includesLargeStraight(sortedHand)) {
//     possScores.largeStraight = 40;
//   }

//   possScores.chance = sumAll(sortedHand);

//   return possScores;
// };

/************************
DISPLAY SCORE FORM - new method, making a form
************************/

// let displayScoreForm = function(scoreOptions) {
//   let cleanTitles = {
//     ones: 'Ones',
//     twos: 'Twos',
//     threes: 'Threes',
//     fours: 'Fours',
//     fives: 'Fives',
//     sixes: 'Sixes',
//     '3ok': 'Three of a Kind',
//     '4ok': 'Four of a Kind',
//     fullHouse: 'Full House',
//     smallStraight: 'Small Straight',
//     largeStraight: 'Large Straight',
//     yahtzee: 'YAHTZEE',
//     chance: 'Chance'
//   };
//   let $scoreTable = $('#scoreTable');

//   let $scoreForm = $('<form id="scoreForm"></form>');

//   // sort the items in the object-convert to array
//   let sortableScores = [];
//   for (title in scoreOptions) {
//     sortableScores.push([title, scoreOptions[title]]);
//   }

//   sortableScores.sort( (a, b) => b[1] - a[1] );

//   // sort the possibilities
//   let sortedScoreOptions = {};
//   _.each(sortableScores, item => sortedScoreOptions[item[0]] = item[1]);

  _.each(sortedScoreOptions, function(scoreValue, scoreCategory) {

    let thisScoreDisplay = scoreValue + ' points: ' + cleanTitles[scoreCategory];

    let $thisScoreButton = $('<label class="clickableScore"><input type="radio" name="score" value="' + scoreCategory + '">' + thisScoreDisplay + '</label><br>');

    $thisScoreButton.appendTo($scoreForm);
  });
  let $submitScoreBtn = $('<input type="submit" value="Accept This Score"></input>');
  $submitScoreBtn.appendTo($scoreForm);

  $scoreTable.empty();

  $scoreForm.appendTo($scoreTable);
  $scoreTable.appendTo($("#turnScoreBox"));

  let getTitleAndValue = function(submittedScoreForm) {
    let usableFormElements = submittedScoreForm[0];
    let i = 0;
    while (usableFormElements[i]) {
      if (usableFormElements[i].checked) {
        let selectedTitle = usableFormElements[i].value;
        let selectedValue = sortedScoreOptions[selectedTitle];
        return [selectedTitle, selectedValue];
      }
      i++;
    }
  };

  // this function needs a way to catch if there's an error:
  $scoreForm.submit(function() {
    event.preventDefault();
    let selectedStuff = getTitleAndValue($scoreForm);

    console.log('you accepted: ' + selectedStuff[0] + ' for ' + selectedStuff[1] + ' points.')
  });
};

/************************
DE-SELECT ALL DICE
************************/

let getSelection = function() {
  return isSelected;
};

let clearSelection = function() {
  isSelected = [false, false, false, false, false];
  for (let i = 0; i < 5; i++) {
    $rolledDiceLocs[i].css("background-color", "transparent");
  }
};

let countSelectedDice = function() {
  let totalSelected = 0;
  for (let i = 0; i < 5; i++) {
    if (isSelected[i]) {
      totalSelected++;
    }
  }
  return totalSelected;
};

let rollDiceIfNotSelected = function(selection, givenHand) {
  let newDiceNeeded = 5 - countSelectedDice();
  let newDiceRolled = rollDice(newDiceNeeded);
  let allDiceValues = givenHand;

  for (let i = 0; i < 5; i++) {
    if (!isSelected[i]) {
      animateRoll($('#diceLoc' + i));
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
  _.each(status, function(key) {
    result[key] = status[key];
  });
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
  }, 750);

  let nRollsNow = prevRolls + 1;

  let turnSummary = {
    rollsMade: nRollsNow,
    currentHand: allDice,
    currentSelection: isSelected
  };

  return turnSummary;
};

/************************
SET TURN STATUS
************************/

let calcScoresFromHand = function(finalHand) {
  let scorePossibilities = scoreMe(finalHand);
  setTimeout(function() {
    displayScoreForm(scorePossibilities);
  }, 750);
};

/************************
QUICK FUNCTIONS DEPENDING ON BUTTON PRESSES
************************/

let initializeSelectAll = function() {
  $("#selectAllBtn").click(function() {
    $("#selectAllBtn").remove();
    for (let i = 0; i < 5; i++) {
      $rolledDiceLocs[i].css("background-color", "yellow");
      isSelected[i] = true;
    }
    var $deselectAllBtn = $('<button id="deselectAllBtn">De-Select All Dice</button>');
    $deselectAllBtn.appendTo($('#buttonBox'));
    initializeDeselectAll();
  });
};

let initializeDeselectAll = function() {
  $("#deselectAllBtn").click(function() {
    $("#deselectAllBtn").remove();
    for (let i = 0; i < 5; i++) {
      $rolledDiceLocs[i].css("background-color", "transparent");
      isSelected[i] = false;
    }
    var $selectAllBtn = $('<button id="selectAllBtn">Select All Dice</button>');
    $selectAllBtn.appendTo($('#buttonBox'));
    initializeSelectAll();
  });
};

let initiateNoMoreRolls = function() {
  $('#rollBtn').text('No Rolls Remaining');
  $('#rollBtn').prop('disabled', true);
  $("#selectAllBtn").remove();
};

/************************
PLAY GAME
************************/

// figure out how many players
// set up scorecard
// while turncounter < nPlayers * ?13?, take turns
// after each turn, make player select a score category
  // ? make list of scores into a form/input list?
// on subsequent turns, don't display score categories already filled