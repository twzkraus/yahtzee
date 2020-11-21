import React from 'react';

const prettyNames = {
    'ones': 'Ones',
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

const ScoreCard = ({ scores }) => {
  let scoreArray = [];
  for (let key in scores) {
    scoreArray.push([key, scores[key]]);
  }

  const getRow = (arrayEl) => (
    <tr>
      <td>{prettyNames[arrayEl[0]]}</td>
      <td>{arrayEl[1]}</td>
    </tr>
  );

  return (
    <table id="scoreboard">
      <thead>
        <th>Category</th>
        <th>Player 1</th>
      </thead>
      {scoreArray.map(cat => getRow(cat))}
    </table>
  )
};

export default ScoreCard;