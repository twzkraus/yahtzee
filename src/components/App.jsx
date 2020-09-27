import React, { useState } from 'react';
import { display, play } from '../diceMethods.js';


const App = (props) => {

  const [selected, setSelected] = useState([]);
  const [diceVals, setDiceVals] = useState([1, 1, 1, 1, 1]);
  const [possScores, setPossScores] = useState([]);


  return (
    <div className="mainContent">
      <div className="diceBox">
        {diceVals.map((die, i) => <Die val={diceVals[i]} selected={}/>)}
        {/* create Die component for rendering */}

      </div>
      <div id="buttonBox">
        <button id="rollBtn">Start Turn</button>
      </div>
      <div className="scoreBox">

      </div>
    </div>
  )
};
