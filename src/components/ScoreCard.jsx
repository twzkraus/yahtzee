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

const ScoreCard = ({ players, float }) => {
  debugger;
  let scoreArray = [];
  let runningTotal = 0;
  // let upperScore, lowerScore, upperWithBonus, bonusAchieved;
  debugger;
  for (let key in players[0].scores) {
    if (key === '3ok') {
      scoreArray.push(['mid']);
      // upperScore = runningTotal;
      // upperWithBonus = upperScore;
      // if (upperScore >= 63) {
      //   bonusAchieved = true;
      //   upperWithBonus += 35;
      // }
      // upperWithBonus = upperScore >= 63 ? upperScore + 35 : upperScore;
      // runningTotal = 0;
    }
    scoreArray.push([key, players[0].scores[key]]);
    // runningTotal += scores[key];
  }
  // lowerScore = runningTotal;
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
        <td className='td-center'>{arrayEl[1]}</td>
      </tr>
    )
  };

  const getUpperSummary = () => (
      <>
        <tr>
          <td><b>{'Upper Section Total'}</b></td>
          {players.map(player => <td className='td-center'>{player.getUpperScore()}</td>)}
        </tr>
        <tr>
        <td><b>{'Bonus'}</b></td>
        {players.map(player => <td className='td-center'>{player.getUpperScore() >= 63 ? 35 : 0}</td>)}
        {/* <td className='td-center'>{bonusAchieved ? 35 : 0}</td> */}
      </tr>
      <tr>
        <td><b>{'Total With Bonus'}</b></td>
        {/* <td className='td-center td-emphasis'>{upperWithBonus}</td> */}
        {players.map(player => <td className='td-center td-emphasis'>{player.getUpperScore() >= 63 ? player.getUpperScore() + 35 : player.getUpperScore()}</td>)}
      </tr>
      <tr>
        <td>{''}</td>
        <td>{''}</td>
      </tr>
      <tr>
        <td className='td-emphasis'>{'Lower Section'}</td>
        <td>{''}</td>
      </tr>
    </>
  );

  const getLowerSummary = () => (
    <>
      <tr>
        <td><b>{'Upper Section Total'}</b></td>
        {/* <td className='td-center'>{upperWithBonus}</td> */}
        {players.map(player => <td className='td-center'>{player.getUpperScore() >= 63 ? player.getUpperScore() + 35 : player.getUpperScore()}</td>)}
      </tr>
      <tr>
        <td><b>{'Lower Section Total'}</b></td>
        {/* <td className='td-center'>{lowerScore}</td> */}
        {players.map(player => <td className='td-center'>{player.getLowerScore()}</td>)}
      </tr>
      <tr>
        <td><b>{'Grand Total'}</b></td>
        {/* <td className='td-center td-emphasis'>{upperWithBonus + lowerScore}</td> */}
        {players.map(player => <td className='td-center td-emphasis'>{player.getLowerScore() + player.getUpperScore() >= 63 ? player.getUpperScore() + 35 : player.getUpperScore()}</td>)}
      </tr>
    </>
  );

  const getHead = () => {
    return (
      <>
        <th>{'Upper Section'}</th>
        {players.map(player => <th>{player.name}</th>)}
      </>
    );
  }

  return (
    <table className={`scoreboard float-${float}`}>
      <thead>
        {getHead()}
      </thead>
      {scoreArray.map(cat => getRow(cat))}
    </table>
  )
};

export default ScoreCard;