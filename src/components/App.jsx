import React, { useState, useEffect } from 'react';
import { display, play } from '../../gameplay/diceMethods.js';
import Die from './Die.jsx';
import ScoreForm from './ScoreForm.jsx';
import ScoreCard from './ScoreCard.jsx';
import User from '../../gameplay/userClass.js';

const App = (props) => {

  const [diceVals, setDiceVals] = useState([1, 1, 1, 1, 1]);
  const [possScores, setPossScores] = useState(null);
  const [selected, setSelected] = useState([false, false, false, false, false]);
  const [rollsMade, setRollsMade] = useState(0);
  const [players, setPlayers] = useState([new User('Player 1'), new User('Player 2')]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [alertMsg, setAlertMsg] = useState(null);
  const [numTurns, setNumTurns] = useState(0);
  const [winner, setWinner] = useState(null);

  const initiateGameStart = (n, names) => {
    let weakPlayers = [];
    while (weakPlayers.length < n) {
      weakPlayers.push(new User(names[i]));
    }
    setPlayers(weakPlayers);
  };

  const makeNthRoll = () => {
    rollOnce();
  };

  const numSelected = () => {
    return selected.filter(el => el).length;
  };

  const parsePossScores = (rawScores) => {
    let validScores = {};
    for (let key in rawScores) {
      if (players[currentPlayerIdx].scores[key] === null) {
        validScores[key] = rawScores[key];
      } else if (key === 'yahtzee' && players[currentPlayerIdx].scores[key]) {
        validScores['bonusYahtzee'] = 100;
      }
    }
    setPossScores(validScores);
  }

  const rollOnce = () => {
    animateRoll(5, () => {
      let thisRoll = play.rollDice(5 - numSelected());
      let currentDiceVals = setDiceValsIfNotSelected(thisRoll);
      setRollsMade(rollsMade + 1);
      parsePossScores(play.getAndDisplayScores(currentDiceVals));
    })
  };

  const animateRoll = (n, cb) => {
    let currentVals = diceVals.slice();
    for (let i = 0; i < 5; i++) {
      if (!selected[i]) {
        currentVals[i] = Math.ceil(Math.random() * 6);
      }
    }
    setDiceVals(currentVals);
    if (n) {
      setTimeout(() => animateRoll(n - 1, cb), 100);
    } else {
      cb();
    }
  };

  const setDiceValsIfNotSelected = (roll) => {
    let diceValsCopy = diceVals.slice();
    diceValsCopy.forEach((val, i) => {
      if (!selected[i]) {
        let value = roll.pop();
        diceValsCopy[i] = value;
      }
    })
    setDiceVals(diceValsCopy);
    return diceValsCopy;
  };

  const handleSelect = (position) => {
    let selectedCopy = selected.slice();
    selectedCopy[position] = !selectedCopy[position];
    setSelected(selectedCopy);
  };

  const gameIsOver = () => {
    return numTurns === players.length * 13 - 1;
  };

  const handleGameOver = () => {
    let max = 0;
    let playerWithMax = null;
    players.forEach(player => {
      if (player.bonusYahtzee === null) {
        // NOTE: This is not working at the moment. Bonus Yahtzee shows up as blank.
        player.addScore({ 'bonusYahtzee': 0});
      }
      let thisPlayersScore = player.getTotalScore();
      if (thisPlayersScore > max) {
        max = thisPlayersScore;
        playerWithMax = player;
      }
    });
    setWinner(playerWithMax);
  };

  const handleNewTurn = () => {
    if (gameIsOver()) {
      handleGameOver();
    } else {
      setRollsMade(0);
      setSelected([false, false, false, false, false]);
      setPossScores(null);
      setDiceVals([1, 1, 1, 1, 1]);
      changePlayer();
    }
  };

  const changePlayer = () => {
    let newNumTurns = numTurns + 1;
    setNumTurns(newNumTurns);
    setCurrentPlayerIdx(newNumTurns % players.length);
  };

  const getRollButton = () => {
    if (rollsMade < 3) {
      return <button id="roll-button" onClick={makeNthRoll}>{`ROLL!`}</button>
    } else {
      return <button id="roll-button" disabled >{`No Rolls Left`}</button>
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let acceptedScore = parseCategoryAndScore(document.forms['scoreForm'].elements);
    if (acceptedScore) {
      addScore(acceptedScore);
      handleNewTurn();
    }
  };

  const alertUser = (msg) => {
    setAlertMsg(msg);
    setTimeout(turnAlertOff, 1500);
  };

  const turnAlertOff = () => {
    setAlertMsg(null);
  };

  const parseCategoryAndScore = (form) => {
    for (let i = 0; i < form.length; i++) {
      if (form[i].checked) {
        let scorePieces = form[i].value.split('--');
        return { [scorePieces[0]]: parseInt(scorePieces[1]) }
      }
    }
    alertUser('Please select a score option first');
  };

  const addScore = (acceptedScore) => {
    players[currentPlayerIdx].addScore(acceptedScore);
  };

  const handleZero = (event) => {
    event.preventDefault();
    addZerosToScoreCard();
  };

  const addZerosToScoreCard = () => {
    let scoresCopy = JSON.parse(JSON.stringify(possScores));
    for (let key in players[currentPlayerIdx].scores) {
      if (!possScores[key] && players[currentPlayerIdx].scores[key] === null && key !== 'bonusYahtzee') {
        scoresCopy[key] = 0;
      }
    }
    setPossScores(scoresCopy);
  };

  return (
    <div className="mainContent">
      <div id="messageBox">
        {(gameIsOver() && !!winner) ?
        <>
          <p>
            {`Game Over! The winner is ${winner.name}`}
          </p>
          {/* Note: button does not do anything currently  */}
          <button>Play Again</button>
        </> :
        <>
          <p>{`Now Playing: ${players[currentPlayerIdx].name}`}</p>
          <p>{`Rolls made: ${rollsMade}`}</p>
        </>
        }
      </div>
      <div className="diceBox">
        {diceVals.map((die, i) => <Die val={diceVals[i]} position={i} selectable={rollsMade > 0} setSelected={handleSelect} selected={selected[i]}/>)}
      </div>
      <div id="buttonBox">
        {getRollButton()}
      </div>
      <div className="scoreBox">
        <ScoreForm scores={possScores} handleFormSubmit={handleFormSubmit} handleZero={handleZero} rollsMade={rollsMade}/>
      </div>
      {alertMsg ? <div>{alertMsg}</div> : ''}
      <ScoreCard players={players} float={!!possScores}/>
    </div>
  )
};

export default App;
