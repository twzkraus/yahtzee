import React, { useState } from 'react';

const Die = ({val, position}) => {

  const [selected, setSelected] = useState(false);

  return (
  <div className={`diceLoc diceLoc${position} selected-${selected}`}>
    <div className={`dice face${val}`} onClick={() => setSelected(!selected)}>
      <Dots val={val} />
    </div>
  </div>
  );
};

export default Die;
