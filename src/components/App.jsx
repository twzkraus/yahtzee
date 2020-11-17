import React, { useState } from 'react';
import { display, play } from '../../gameplay/diceMethods.js';
import Die from './Die.jsx';
import ScoreForm from './ScoreForm.jsx';


const App = (props) => {

  const [diceVals, setDiceVals] = useState([1, 1, 1, 1, 1]);
  const [possScores, setPossScores] = useState([]);
  const [acceptedHand, setAcceptedHand] = useState([]);
  const [selected, setSelected] = useState([false, false, false, false, false]);

  const takeTurn = () => {
    let rollsMade = 0;
    // while (rollsMade < 3 && acceptedHand.length < 5) {
      rollOnce();
    // }
  }

  const rollOnce = () => {
    let thisRoll = play.rollDice(5 - acceptedHand.length);
    setDiceVals(thisRoll);
    setPossScores(play.getAndDisplayScores(thisRoll));
  };

  const handleSelect = (position) => {
    let selectedCopy = selected.slice();
    selectedCopy[position] = !selectedCopy[position];
    setSelected(selectedCopy);
  };

  return (
    <div className="mainContent">
      <div className="diceBox">
        {diceVals.map((die, i) => <Die val={diceVals[i]} position={i} setSelected={handleSelect} selected={selected[i]}/>)}
      </div>
      <div id="buttonBox">
        <button onClick={takeTurn}>Start Turn</button>
      </div>
      <div className="scoreBox">
        <ScoreForm scores={possScores} />
        {/* need to define onSubmit function for the form */}
      </div>
    </div>
  )
};

export default App;
