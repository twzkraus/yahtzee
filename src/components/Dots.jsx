import React from 'react';

const Dots = ({val}) => {

  let i = 0;
  let dots = [];
  while (dots.length < val) {
    dots.push(dots.length);
  }

  return (
    <>
      {val < 4 ?
      // 3 or below: just add the dots
      dots.map((i) => <span className="dot" key={i}/> ) :
      // 6: add 3 dots in 2 columns
      val === 6 ?
      <>
      <div className="column">
        <span className="dot" key={i++}/>
        <span className="dot" key={i++}/>
        <span className="dot" key={i++}/>
      </div>
      <div className="column">
        <span className="dot" key={i++}/>
        <span className="dot" key={i++}/>
        <span className="dot" key={i++}/>
      </div>
      </> :
      // 4 or 5: 2 dots in first column
      <>
      <div className="column">
        <span className="dot" key={i++}/>
        <span className="dot" key={i++}/>
      </div>
      </>
      }

      {val === 5 ?
      // 5: needs center column
      <div className="column">
        <span className="dot" key={i++} />
      </div> : '' }

      {val === 5 || val === 4 ?
      // 4 or 5: finish off right column
      <div className="column">
        <span className="dot" key={i++}/>
        <span className="dot" key={i++}/>
      </div>
        : ''}

    </>
  )
}

export default Dots;