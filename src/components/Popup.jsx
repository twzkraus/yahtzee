import React, { useState } from 'react';

const Popup = ({ scenario, winner, startNewGame }) => {

  const [numPlayers, setNumPlayers] = useState(2);

  const changeNumPlayers = (direction) => {
    if (direction === '-' && numPlayers > 1) {
      setNumPlayers(numPlayers - 1);
    } else if (direction ==='+') {
      setNumPlayers(numPlayers + 1);
    }
  }

  const getStartingPopup = () => {return (
    <>
      <h1>
        {`Welcome Aboard! How many players are joining us?`}
      </h1>
      <br></br>
      <h1><button onClick={() => changeNumPlayers('-')}>{'-'}</button>
        {numPlayers}
        <button onClick={() => changeNumPlayers('+')}>{'+'}</button>
        </h1>
        <button onClick={() => startNewGame(numPlayers)}>{'OK!'}</button>
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