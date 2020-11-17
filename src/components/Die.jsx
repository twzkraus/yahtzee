import React from 'react';
import Dots from './Dots.jsx';

const Die = ({val, position, setSelected, selected}) => {

  return (
  <div className={`diceLoc diceLoc${position} selected-${selected}`}>
    <div className={`dice face${val}`} onClick={() => setSelected(position)}>
      <Dots val={val} />
    </div>
  </div>
  );
};

export default Die;
