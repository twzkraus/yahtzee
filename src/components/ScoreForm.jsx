import React from 'react';
import ScoreItem from './ScoreItem.jsx';

const ScoreForm = ({scores}) => (
  <form id="scoreForm">
    {scores.map(score => <ScoreItem score={score}/>)}
    {/* this wasn't here in jquery version, so I'm not sure where it's supposed to be */}
    <button type="submit"></button>
  </form>
);


export default ScoreForm;
