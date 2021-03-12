import React, { useState } from 'react';

const Popup = ({ scenario, winner, startGameWithNames, startNewGame }) => {

  const [numPlayers, setNumPlayers] = useState(2);
  const [numChosen, setNumChosen] = useState(false);
  const [playerNames, setPlayerNames] = useState([]);

  const changeNumPlayers = (direction) => {
    if (direction + numPlayers) {
      setNumPlayers(direction + numPlayers);
    }
  };

  const handlePlayerNameChange = (event, i) => {
    let playerCopy = playerNames.slice();
    playerCopy[i] = event.target.value;
    setPlayerNames(playerCopy);
  };

  const submitNames = () => {
    let names = playerNames;
    for (let i = 0; i < numPlayers; i++) {
      if (!names[i]) {
        names[i] = `Player ${i + 1}`;
      }
    }
    startGameWithNames(names);
  };

  const getNumbersPopup = () => (
    <>
      <div className="subPopup">
        <h1>
          {`Welcome!`}<br></br>{`How many players are joining us?`}
        </h1>
      </div>
      <div className="subPopup">
        <h1><button onClick={() => changeNumPlayers(-1)}>{'-'}</button>
          {numPlayers}
          <button onClick={() => changeNumPlayers(1)}>{'+'}</button>
          </h1>
      </div>
      <div className="subPopup">
        <button onClick={() => setNumChosen(true)}>{'OK'}</button>
      </div>
    </>
  );

  const getNamesPopup = () => {
    let names = [];
    while (names.length < numPlayers) {
      names.push('');
    }
    return (
      <>
        <div className="subPopup">
          <h1>
            {`What are your names?`}
          </h1>
        </div>
        <form className="subPopupBlock">
          {names.map((name, i) => <p key={`player-${i + 1}`}><input placeholder={`Player ${i + 1}`} onChange={(e) => handlePlayerNameChange(e, i)}></input></p>)}
        </form>
        <div className="subPopup">
          <button onClick={() => submitNames(playerNames)}>{'Play!'}</button>
        </div>
      </>
    )
  };

  const getEndingPopup = () => (
    <>
      <div className="subPopup">
        <h1>
          {`Game over! The winner is ${winner.name}`}
        </h1>
      </div>
      <div className="subPopup">
        <button id="play-again-button" onClick={() => startNewGame(2, true)}>{`Play Again!`}</button>
      </div>
    </>
  );

  return scenario === 'start' ? numChosen ? getNamesPopup() : getNumbersPopup() : scenario === 'end' ? getEndingPopup() : '';
};

export default Popup;