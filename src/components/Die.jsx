import React from 'react';
import Dots from './Dots.jsx';

const Die = ({val, position, setSelected, selected, selectable}) => {

  const getSelected = () => (
    <div className={`diceLoc diceLoc${position} selected`}>
      <div className={`dice face${val}`} onClick={selectable ? () => setSelected(position) : console.log('cant de-select this')}>
        <Dots val={val} />
      </div>
    </div>
  );

  const getUnselected = () => (
    <div className={`diceLoc diceLoc${position}`}>
      <div className={`dice face${val}`} onClick={selectable ? () => setSelected(position) : () => console.log('cant select this')}>
        <Dots val={val} />
      </div>
    </div>
  );

  return selected ? getSelected() : getUnselected();
};

export default Die;
