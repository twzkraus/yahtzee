import React, { useState } from 'react';
import { display, play } from '../../gameplay/diceMethods.js';
import Die from './Die.jsx';
import ScoreForm from './ScoreForm.jsx';


const App = (props) => {

  const [diceVals, setDiceVals] = useState([1, 1, 1, 1, 1]);
  const [possScores, setPossScores] = useState([]);
  const [selected, setSelected] = useState([false, false, false, false, false]);
  const [rollsMade, setRollsMade] = useState(0);

  const makeNthRoll = () => {
    rollOnce();
    setRollsMade(rollsMade + 1);
  };

  const numSelected = () => {
    return selected.filter(el => el).length;
  };

  const rollOnce = () => {
    let thisRoll = play.rollDice(5 - numSelected());
    let currentDiceVals = setDiceValsIfNotSelected(thisRoll);
    setPossScores(play.getAndDisplayScores(currentDiceVals));
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
    setPossScores([]);
    setDiceVals([1, 1, 1, 1, 1]);
    // eventually: change player
  };

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

  return (
    <div className="mainContent">
      <div className="diceBox">
        {diceVals.map((die, i) => <Die val={diceVals[i]} position={i} setSelected={handleSelect} selected={selected[i]}/>)}
      </div>
      <div id="buttonBox">
        {getRollButton()}
      </div>
      <div className="scoreBox">
        <ScoreForm scores={possScores} />
        {/* need to define onSubmit function for the form */}
      </div>
    </div>
  )
};

export default App;
