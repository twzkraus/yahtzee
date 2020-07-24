/************************
DICE DISPLAY DEFINITIONS - just needs to be run once.
************************/
var $body = $('body');
var $diceBox = $(".diceBox");
const $dieFace = [];
for (let i = 1; i <=6; i++) {
  let counter = 0;
  let stringOfSpans = '';
  if (i > 3) {
    stringOfSpans += '<div class="column">';
  }
  counter = 0;
  while (counter < i) {
    // need to add columns for dice values 4, 5,  and 6--to stack the dots
    if (i > 3  && counter === Math.floor(i / 2)) {
      stringOfSpans += '</div><div class="column">';
    }
    // dice value 5 has 3 columns
    if (i === 5  && counter === 3) {
      stringOfSpans += '</div><div class="column">';
    }
    // for all dice, add dots
    stringOfSpans += '<span class="dot"></span>';
    counter++;
  }
  if (i > 3) {
    stringOfSpans += '</div>';
  }
  $dieFace[i] = $('<div class="dice face' + i + '">' + stringOfSpans + '</div>');
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

// display 1 die
let renderDie = function(valRolled, dieLoc) {
  // valRolled: number of dice rolled
  // dieLoc: jquery identifier of location
  dieLoc.empty();
  $dieFace[valRolled].appendTo(dieLoc);
}

// display dice
let renderRoll = function() {

};
