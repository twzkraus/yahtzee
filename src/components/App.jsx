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

  const initiateGameStart = (n, names) => {
    let weakPlayers = [];
    while (weakPlayers.length < n) {
      weakPlayers.push(new User(names[i]));
    }
    setPlayers(weakPlayers);
  };

  const makeNthRoll = () => {
    rollOnce();
    setRollsMade(rollsMade + 1);
  };

  const numSelected = () => {
    return selected.filter(el => el).length;
  };

  const parsePossScores = (rawScores) => {
    let validScores = {};
    for (let key in rawScores) {
      if (!players[currentPlayerIdx].scores[key]) {
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

  const handleNewTurn = () => {
    setRollsMade(0);
    setSelected([false, false, false, false, false]);
    setPossScores(null);
    setDiceVals([1, 1, 1, 1, 1]);
    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayerIdx((currentPlayerIdx + 1) % players.length );
  }

  const getRollButton = () => {
    let nth;
    if (rollsMade === 0) {
      nth = 'first';
    } else if (rollsMade === 1) {
      nth = '2nd';
    } else if (rollsMade === 2) {
      nth = 'last';
    }
    if (rollsMade < 3) {
      return <button onClick={makeNthRoll}>{`Make ${nth} roll`}</button>
    } else {
      return <button disabled>{`No rolls left`}</button>
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

  const parseCategoryAndScore = (form) => {
    for (let i = 0; i < form.length; i++) {
      if (form[i].checked) {
        let scorePieces = form[i].value.split('--');
        return { [scorePieces[0]]: parseInt(scorePieces[1]) }
      }
    }
    console.log('you must select a score--maybe make this a popup?');
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
      if (!possScores[key] && !players[currentPlayerIdx].scores[key]) {
        scoresCopy[key] = 0;
      }
    }
    setPossScores(scoresCopy);
  };

  return (
    <div className="mainContent">
      <div id="message-box">{`Now Playing: ${players[currentPlayerIdx].name}`}</div>
      <div className="diceBox">
        {diceVals.map((die, i) => <Die val={diceVals[i]} position={i} selectable={rollsMade > 0} setSelected={handleSelect} selected={selected[i]}/>)}
      </div>
      <div id="buttonBox">
        {getRollButton()}
      </div>
      <div className="scoreBox">
        <ScoreForm scores={possScores} handleFormSubmit={handleFormSubmit} handleZero={handleZero}/>
      </div>
      <ScoreCard players={players} float={!!possScores}/>
    </div>
  )
};

export default App;
