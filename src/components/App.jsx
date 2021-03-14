import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { display, play } from '../../gameplay/diceMethods.js';
import Die from './Die.jsx';
import ScoreCard from './ScoreCard.jsx';
import User from '../../gameplay/userClass.js';
import Popup from './Popup.jsx';
import Confetti from 'react-confetti';

const getNewPlayers = (n = 2) => {
  let result = [];
  while (result.length < n) {
    result.push(new User(`Player ${result.length + 1}`));
  }
  return result;
};

const getPlayersFromNames = (names) => {
  let result = [];
  for (let i = 0; i < names.length; i++) {
    result.push(new User(names[i]));
  }
  return result;
};

const defaults = {
  diceVals: [1, 1, 1, 1, 1],
  possScores: null,
  selected: [false, false, false, false, false],
  rollsMade: 0,
  players: (n) => getNewPlayers(n),
  currentPlayerIdx: 0,
  alertMsg: null,
  numTurns: 0,
  winner: null,
};

const App = (props) => {

  const [diceVals, setDiceVals] = useState(defaults.diceVals);
  const [possScores, setPossScores] = useState(defaults.possScores);
  const [selected, setSelected] = useState(defaults.selected);
  const [rollsMade, setRollsMade] = useState(defaults.rollsMade);
  const [players, setPlayers] = useState(defaults.players());
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(defaults.currentPlayerIdx);
  const [alertMsg, setAlertMsg] = useState(defaults.alertMsg);
  const [numTurns, setNumTurns] = useState(defaults.numTurns);
  const [winner, setWinner] = useState(defaults.winner);
  const [uninitialized, setUninitialized] = useState(true);

  const startNewGame = (n, reset = false) => {
    setDiceVals(defaults.diceVals);
    setPossScores(defaults.possScores);
    setSelected(defaults.selected);
    setRollsMade(defaults.rollsMade);
    setPlayers(defaults.players(n));
    setCurrentPlayerIdx(defaults.currentPlayerIdx);
    setAlertMsg(defaults.alertMsg);
    setNumTurns(defaults.numTurns);
    setWinner(defaults.winner);
    setUninitialized(reset);
  };

  const startGameWithNames = (names, reset = false) => {
    // works like startNewGame, BUT we've been provided player names. Handle appropriately.
    setDiceVals(defaults.diceVals);
    setPossScores(defaults.possScores);
    setSelected(defaults.selected);
    setRollsMade(defaults.rollsMade);
    setCurrentPlayerIdx(defaults.currentPlayerIdx);
    setAlertMsg(defaults.alertMsg);
    setNumTurns(defaults.numTurns);
    setWinner(defaults.winner);
    setUninitialized(reset);
    setPlayers(getPlayersFromNames(names));
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
    return numTurns >= players.length * 13 - 1;
  };

  const handleGameOver = () => {
    let max = 0;
    let playerWithMax = null;
    players.forEach(player => {
      if (player.scores.bonusYahtzee === null) {
        player.addScore({ 'bonusYahtzee': 0});
      }
      let thisPlayersScore = player.getTotalScore();
      if (thisPlayersScore > max) {
        max = thisPlayersScore;
        playerWithMax = player;
      }
    });
    setPossScores(null);
    setWinner(playerWithMax);
  };

  const handleNewTurn = () => {
    if (gameIsOver()) {
      changePlayer();
      handleGameOver();
    } else {
      setRollsMade(0);
      setSelected([false, false, false, false, false]);
      setPossScores(null);
      setDiceVals([1, 1, 1, 1, 1]);
      changePlayer();
      setAlertMsg(null);
    }
  };

  const changePlayer = () => {
    let newNumTurns = numTurns + 1;
    setNumTurns(newNumTurns);
    setCurrentPlayerIdx(newNumTurns % players.length);
  };

  const getRollButton = () => {
    if (gameIsOver() && !!winner) {
      return <button id="roll-button" onClick={startNewGame}>{`Play Again!`}</button>
    } else if (rollsMade < 3) {
      return <button id="roll-button" onClick={makeNthRoll}>{`Roll!`}</button>
    } else {
      return <button id="roll-button-inactive" onClick={handleZero}>{`Take a Zero`}</button>
    }
  };

  const handleScoreClick = (e) => {
    let [key, valString] = e.target.value.split('-');
    let val = parseInt(valString);
    let acceptedScore = { [key]: val };
    let bonusCategories = addScore(acceptedScore);
    if (!bonusCategories) {
      handleNewTurn();
    } else {
      handleYahtzeeJoker(bonusCategories);
    }
  };

  const addScore = (acceptedScore) => {
    return players[currentPlayerIdx].addScore(acceptedScore, diceVals);
  };

  const handleYahtzeeJoker = (bonusCategories) => {
    let scores = play.getAndDisplayScores(diceVals);
    for (let key in bonusCategories) {
      scores[key] = bonusCategories[key];
    }
    delete scores.yahtzee;
    delete scores.bonusYahtzee;
    parsePossScores(scores);
    setAlertMsg('MEGA BONUS! Please select your bonus score');
  };

  const handleZero = (event) => {
    if (event) {
      event.preventDefault();
    }
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

  const celebrate = () => (
    <Confetti numberOfPieces={3000} recycle={false} gravity={0.35} confettiSource={{x: 0, y: 0, w: window.innerWidth, h: 200}}/>
  );

  return (
    <>
      <header>
        <div id="logo" onClick={() => startNewGame(2, true)}>Yacht-C!</div>
        {uninitialized ? ReactDOM.createPortal(<Popup scenario={'start'} startGameWithNames={startGameWithNames}/>, document.getElementById('portal-node')) : ''}
        <div id="messageBox">
          {(gameIsOver() && !!winner) ?
          <>
            {ReactDOM.createPortal(<Popup scenario={'end'} isOnePlayer={players.length === 1} winner={winner} startNewGame={startNewGame}/>, document.getElementById('portal-node'))}
            <p>
              {`Game Over! The winner is ${winner.name}`}
            </p>
          </> :
          <>
            <p>{`Now Playing: ${players[currentPlayerIdx].name}`}</p>
            <p>{`Rolls made: ${rollsMade}`}</p>
          </>
          }
        </div>
      </header>
      <div className="mainContent">
        {possScores && (possScores['yahtzee'] || possScores['bonusYahtzee']) ? celebrate() : ''}

        <div className="diceBox">
          {diceVals.map((die, i) => <Die val={diceVals[i]} position={i} selectable={rollsMade > 0 && numTurns < players.length * 13} setSelected={handleSelect} selected={selected[i]}/>)}
        </div>
        <div id="buttonBox">
          {getRollButton()}
        </div>
        <div id="alertBox">
          {alertMsg ? <div>{alertMsg}</div> : ''}
        </div>
        <ScoreCard players={players} currentPlayerIdx={currentPlayerIdx} possScores={possScores} handleSelect={handleScoreClick} handleZero={handleZero}/>
      </div>
    </>
  )
};

export default App;
