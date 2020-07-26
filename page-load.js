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

  var $rollBtn = $('<button>New Roll</button>');
  $rollBtn.appendTo($body);

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

  $rollBtn.click(function() {
    status = takeTurn(status);
    $("#countOfRolls").text(status.rollsMade);
    if (status.rollsMade === 3) {
      turnOver(status.currentHand);
    }
  });

  // if (nRollsNow === 3) {
  //   turnOver();
  // }
})