/************************
DICE DISPLAY DEFINITIONS - just needs to be run once.
************************/
var $body = $('body');
var $diceBox = $(".diceBox");
var $dieFace = [null];
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

// roll dice-jquery button

// pick dice-jquery

// display 1 die at a time
let renderDie = function(valRolled, dieLoc) {
  // valRolled: number of dice rolled
  // dieLoc: jquery identifier of location

  dieLoc.empty();
  makeFace(valRolled).appendTo(dieLoc);
}

// display dice
let renderRoll = function() {

};
