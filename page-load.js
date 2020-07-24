$(document).ready(function() {
  var $body = $('body');
  var $diceBox = $(".diceBox");
  /************************
  SETUP BOXES FOR 5 DICE
  ************************/
  var $rolledDiceLocs = [];
  for (let i = 0; i < 5; i++) {
    $rolledDiceLocs[i] = $('<div class="diceLoc" id="diceLoc' + i + '"></div>');
    $rolledDiceLocs[i].appendTo($diceBox);
  }

  /************************
  EXAMPLE DICE SETUP
  ************************/
 // setup span strings, then make them legit spans
 // later, just append the spans to divs as needed
  var $exampleDice = [];
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
    $exampleDice[i] = $('<div class="dice face' + i + '">' + stringOfSpans + '</div>');
    $exampleDice[i].appendTo($rolledDiceLocs[i-1]);
  }


  // var $die = [];
  // for (let i = 1; i <= 5; i++) {
  //   $die[i] = $('<div id="die' + i + '" class="dice face2"><span class="dot"></span><span class="dot"></div>');
  //   $die[i].appendTo($diceBox);
  // }

  var $rollBtn = $('<button>Roll Dice</button>');
  $rollBtn.appendTo($body);


  $rollBtn.click(function() {
    let rolled = rollDice(5);
    for (let i = 0; i < 5; i++) {
      renderDie(rolled[i], $rolledDiceLocs[i]);
    }
  });
})