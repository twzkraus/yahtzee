import React, { useState } from 'react';

const Popup = ({ scenario, winner, startGameWithNames }) => {

  const [numPlayers, setNumPlayers] = useState(2);
  const [numChosen, setNumChosen] = useState(false);
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2']);

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

  const getNumbersPopup = () => (
    <>
      <div className="subPopup">
        <h1>
          {`Welcome Aboard! How many players are joining us?`}
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
            {`What shall we call you?`}
          </h1>
        </div>
        <form className="subPopupBlock">
          {names.map((name, i) => <><p>{`Player ${i + 1}:\t`}<input onChange={(e) => handlePlayerNameChange(e, i)}></input></p></>)}
        </form>
        <div className="subPopup">
          <button onClick={() => startGameWithNames(playerNames)}>{'Play!'}</button>
        </div>
      </>
    )
  };

  const getEndingPopup = () => (
    <>
      <h1>
        {`Game over! The winner is ${winner.name}`}
      </h1>
    </>
  );

  return scenario === 'start' ? numChosen ? getNamesPopup() : getNumbersPopup() : scenario === 'end' ? getEndingPopup() : '';
};

export default Popup;