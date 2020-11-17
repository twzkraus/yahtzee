import React from 'react';
import ScoreItem from './ScoreItem.jsx';

const ScoreForm = ({ scores, handleFormSubmit }) => {
  let scoreArray = [];
  for (let key in scores) {
    if (scores[key]) {
      scoreArray.push([scores[key], key]);
    }
  }
  return (
    <form id="scoreForm" onSubmit={(e) => handleFormSubmit(e)}>
      {scoreArray.map(score => <ScoreItem score={score}/>)}
      {scoreArray.length ? <button type="submit">Accept Score</button> : ''}
    </form>
  );
}


export default ScoreForm;
