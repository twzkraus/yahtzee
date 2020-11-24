import React from 'react';

const ScoreItem = ({score}) => (
  <label className="clickableScore">
    <input type="radio" name="score" value={`${score[1]}--${score[0]}`}/>{`${score[0]} points: ${score[2]}`}
    <br />
  </label>
);

export default ScoreItem;