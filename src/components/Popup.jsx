import React from 'react';

const Popup = ({ scenario, winner }) => {

  const getStartingPopup = () => {return (
    <>
      <h1>
        {`Welcome. How many players?`}
      </h1>
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