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
  var $exampleDice = [];

  for (let i = 0; i < 5; i++) {
    $exampleDice[i] = makeFace(1);
    $exampleDice[i].appendTo($rolledDiceLocs[i]);
  }

  var $rollBtn = $('#rollBtn');

  // jquery function for selecting dice
  for (let i = 0; i < 5; i++) {
    $rolledDiceLocs[i].click(function() {
      if (isSelected[i]) {
        $rolledDiceLocs[i].css("background-color", "transparent");
      } else {
        $rolledDiceLocs[i].css("background-color", "yellow");
      }
      isSelected[i] = !isSelected[i];
    });
  }

  let status = {
    rollsMade: 0,
    currentHand: []
  };

  let $selectAllBtn = $('<button id="selectAllBtn">Select All Dice</button>');

  /************************
  ACTUAL TRIGGER TO TAKE TURNS AND PLAY GAME
  ************************/

  /************************
  CLICK FUNCTIONS
  ************************/
  $rollBtn.click(function() {
    status = takeTurn(status);
    // first roll: include a select all button
    if (status.rollsMade === 1) {
      $selectAllBtn.appendTo($('#buttonBox'));
      initializeSelectAll();
    }
    $("#countOfRolls").text(status.rollsMade);
    calcScoresFromHand(status.currentHand);

    if (status.rollsMade < 3) {
      $rollBtn.text('Take Roll #' + (status.rollsMade + 1));
    } else {
      initiateNoMoreRolls();
    }
  });

  $("#logo").click(function() {
    location.reload(true);
  });

});