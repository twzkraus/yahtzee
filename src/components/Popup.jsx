import React, { useState } from 'react';

const Popup = ({ scenario, winner, startNewGame }) => {

  const [numPlayers, setNumPlayers] = useState(2);

  const changeNumPlayers = (direction) => {
    if (direction + numPlayers) {
      setNumPlayers(direction + numPlayers);
    }
  };

  const getStartingPopup = () => {return (
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
        <button onClick={() => startNewGame(numPlayers)}>{'Go!'}</button>
      </div>
    </>
  )};

  const getEndingPopup = () => (
    <>
      <h1>
        {`Game over! The winner is ${winner.name}`}
      </h1>
    </>
  );

  return scenario === 'start' ? getStartingPopup() : scenario === 'end' ? getEndingPopup() : '';
};

export default Popup;