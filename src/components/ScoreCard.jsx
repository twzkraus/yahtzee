import React from 'react';

const ScoreCard = ({ scores }) => {
  let scoreArray = [];
  for (let key in scores) {
    scoreArray.push([key, scores[key]]);
  }

  const getRow = (arrayEl) => (
    <tr>
      <td>{arrayEl[0]}</td>
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