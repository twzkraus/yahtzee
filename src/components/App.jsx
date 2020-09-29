import React, { useState } from 'react';
import { display, play } from '../diceMethods.js';
import Die from './Die.jsx';
import ScoreForm from './ScoreForm.jsx';


const App = (props) => {

  const [diceVals, setDiceVals] = useState([1, 1, 1, 1, 1]);
  const [possScores, setPossScores] = useState([]);


  return (
    <div className="mainContent">
      <div className="diceBox">
        {diceVals.map((die, i) => <Die val={diceVals[i]} position={i}/>)}
      </div>
      <div id="buttonBox">
        <button id="rollBtn">Start Turn</button>
      </div>
      <div className="scoreBox">
        <ScoreForm scores={possScores} onSubmit={} />
        {/* need to define onSubmit function for the form */}
      </div>
    </div>
  )
};

export default App;
