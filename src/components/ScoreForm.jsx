import React from 'react';
import ScoreItem from './ScoreItem.jsx';

const ScoreForm = ({scores}) => {
  let scoreArray = [];
  for (let key in scores) {
    if (scores[key]) {
      scoreArray.push([scores[key], key]);
    }
  }
  return (
    <form id="scoreForm">
      {scoreArray.map(score => <ScoreItem score={score}/>)}
      {/* this wasn't here in jquery version, so I'm not sure where it's supposed to be */}
      <button type="submit"></button>
    </form>
  );
}


export default ScoreForm;
