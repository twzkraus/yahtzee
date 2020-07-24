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
  console.log(rolledDice);
  return rolledDice;
};

// display 1 die at a time
let renderDie = function(valRolled, dieLoc) {
  // valRolled: number of dice rolled
  // dieLoc: jquery identifier of location

  dieLoc.empty();
  makeFace(valRolled).appendTo(dieLoc);
}

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
  let newDiceRolled = rollDice(newDiceNeeded);
  let allDiceValues = [];

  for (let i = 0; i < 5; i++) {
    if (!isSelected[i]) {
      let thisNewDie = newDiceRolled.pop();
      allDiceValues[i] = thisNewDie;
    } else {
      // this is failing. can't read index X of undefined.
      allDiceValues[i] = givenHand[i];
    }
  }
  return allDiceValues;
};

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

  for (let i = 0; i < 5; i++) {
    renderDie(allDice[i], $rolledDiceLocs[i]);
  }

  let turnSummary = {
    rollsMade: prevRolls + 1,
    currentHand: allDice,
    currentSelection: isSelected
  };

  return turnSummary;
};