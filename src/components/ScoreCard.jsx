import React, { useState } from 'react';

const prettyNames = {
  'ones': 'Aces',
  'twos': 'Twos',
  'threes': 'Threes',
  'fours': 'Fours',
  'fives': 'Fives',
  'sixes': 'Sixes',
  '3ok': '3 of a Kind',
  '4ok': '4 of a Kind',
  'fullHouse': 'Full House',
  'smallStraight': 'Small Straight',
  'largeStraight': 'Large Straight',
  'yahtzee': 'Yahtzee',
  'chance': 'Chance',
  'bonusYahtzee': 'Bonus Yahtzee',
};

const ScoreCard = ({ scores }) => {

  let scoreArray = [];
  let runningTotal = 0;
  let upperScore, lowerScore, upperWithBonus, bonusAchieved;
  for (let key in scores) {
    if (key === '3ok') {
      scoreArray.push(['mid']);
      upperScore = runningTotal;
      upperWithBonus = upperScore;
      if (upperScore >= 63) {
        bonusAchieved = true;
        upperWithBonus += 35;
      }
      // upperWithBonus = upperScore >= 63 ? upperScore + 35 : upperScore;
      runningTotal = 0;
    }
    scoreArray.push([key, scores[key]]);
    runningTotal += scores[key];
  }
  lowerScore = runningTotal;
  scoreArray.push(['end']);

  const getRow = (arrayEl) => {
    if (arrayEl[0] === 'mid') {
      return getUpperSummary();
    } else if (arrayEl[0] === 'end') {
      return getLowerSummary();
    }
    return (
      <tr>
        <td>{prettyNames[arrayEl[0]]}</td>
        <td>{arrayEl[1]}</td>
      </tr>
    )
  };

  const getUpperSummary = () => (
      <>
        <tr>
          <td><b>{'Upper Section Total'}</b></td>
          <td>{upperScore}</td>
        </tr>
        <tr>
        <td><b>{'Bonus'}</b></td>
        <td>{bonusAchieved ? 35 : 0}</td>
      </tr>
      <tr>
        <td><b>{'Total With Bonus'}</b></td>
        <td>{upperWithBonus}</td>
      </tr>
      <tr>
        <td>{''}</td>
        <td>{''}</td>
      </tr>
    </>
  );

  const getLowerSummary = () => (
    <>
      <tr>
        <td><b>{'Upper Section Total'}</b></td>
        <td>{upperWithBonus}</td>
      </tr>
      <tr>
        <td><b>{'Lower Section Total'}</b></td>
        <td>{lowerScore}</td>
      </tr>
      <tr>
        <td><b>{'Total With Bonus'}</b></td>
        <td>{upperWithBonus + lowerScore}</td>
      </tr>
      <tr>
        <td>{''}</td>
        <td>{''}</td>
      </tr>
    </>
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