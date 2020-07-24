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
  // $rollBtn.appendTo($body);

  var $startTurnBtn = $('<button>Start a Turn</button>');
  $startTurnBtn.appendTo($body);

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

  // jquery function for clicking roll dice
  // $rollBtn.click(function() {
  //   let rolled = rollDice(5);
  //   for (let i = 0; i < 5; i++) {
  //     renderDie(rolled[i], $rolledDiceLocs[i]);
  //   }
  // });

  let status = {
    rollsMade: 0,
    currentHand: []
  };

  $startTurnBtn.click(function() {

    // remove the start turn button, replace it with continue turn button
    $startTurnBtn.remove();
    $rollBtn.appendTo($body);

    let turnStatus = takeTurn(status);
    status = setStatus(turnStatus);
    return status;
  });

  $rollBtn.click(function() {
    console.log(status);
    console.log('status passed in is: ' + JSON.stringify(status));
    let currentStatus = takeTurn(status);
    console.log(currentStatus);
    return currentStatus;
  });
})