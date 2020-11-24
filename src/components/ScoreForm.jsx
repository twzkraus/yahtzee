import React from 'react';
import ScoreItem from './ScoreItem.jsx';

const prettyNames = {
  'ones': 'Aces',
  'twos': 'Twos',
  'threes': 'Threes',
  'fours': 'Fours',
  'fives': 'Fives',
  'sixes': 'Sixes',
  'chance': 'Chance',
  '3ok': '3 of a Kind',
  '4ok': '4 of a Kind',
  'fullHouse': 'Full House',
  'smallStraight': 'Small Straight',
  'largeStraight': 'Large Straight',
  'yahtzee': 'Yahtzee',
};

const ScoreForm = ({ scores, handleFormSubmit }) => {
  let scoreArray = [];
  for (let key in scores) {
    if (scores[key]) {
      scoreArray.push([scores[key], key, prettyNames[key]]);
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
