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
  'yahtzee': 'Yacht-C',
  'chance': 'Chance',
  'bonusYahtzee': 'Bonus Yacht-C',
};

const ScoreCard = ({ players, currentPlayerIdx, possScores, handleSelect, handleZero }) => {
  const getScoreArray = () => {
    let result = [];
    for (let key in prettyNames) {
      if (key === '3ok') {
        result.push(['mid']);
      }
      let el = [key];
      for (let i = 0; i < players.length; i++) {
        el.push(players[i].scores[key]);
      }
      result.push(el);
    }
    result.push(['end']);
    return result;
  };

  const handleNameChange = (i, value) => {
    players[i].name = value;
  };

  let scoreArray = getScoreArray();

  const hasZeroScores = () => {
    for (let key in possScores) {
      return false;
    }
    return true;
  };

  if (possScores && hasZeroScores()) {
    handleZero();
  }

  const getRow = (arrayEl) => {
    if (arrayEl[0] === 'mid') {
      return getUpperSummary();
    } else if (arrayEl[0] === 'end') {
      return getLowerSummary();
    }
    return (
      <tr>
        <td className="td-label">{prettyNames[arrayEl[0]]}</td>
        {arrayEl.slice(1).map((el, idx) =>
          idx === currentPlayerIdx && possScores && possScores[arrayEl[0]] !== undefined ?
          <td className='td-center player-score clickable'><button className="score-option" value={`${arrayEl[0]}-${possScores[arrayEl[0]]}`} onClick={handleSelect}>{possScores[arrayEl[0]]}</button></td>:
          <td className='td-center player-score clickable'>{el}</td>
        )}
      </tr>
    )
  };

  const getUpperSummary = () => (
      <>
        <tr>
          <td><b>{'Upper Section Total'}</b></td>
          {players.map(player => <td className='td-center player-score'>{player.getUpperScore()}</td>)}
        </tr>
        <tr>
        <td><b>{'Upper Section Bonus'}</b></td>
        {players.map(player => <td className='td-center player-score'>{player.hasBonus() ? 35 : 0}</td>)}
      </tr>
      <tr>
        <td><b>{'Total With Bonus'}</b></td>
        {players.map(player => <td className='td-center td-emphasis player-score'>{player.getFullUpperScore()}</td>)}
      </tr>
      <tr>
        <td>{''}</td>
        {players.map(p => <td>{''}</td> )}
      </tr>
      <tr>
        <td className='td-emphasis td-label'>{'Lower Section'}</td>
        {players.map(p => <td className="td-empty player-score">{''}</td> )}
      </tr>
    </>
  );

  const getLowerSummary = () => (
    <>
      <tr>
        <td><b>{'Upper Section Total'}</b></td>
        {players.map(player => <td className='td-center player-score'>{player.getFullUpperScore()}</td>)}
      </tr>
      <tr>
        <td><b>{'Lower Section Total'}</b></td>
        {players.map(player => <td className='td-center player-score'>{player.getLowerScore()}</td>)}
      </tr>
      <tr>
        <td><b>{'Grand Total'}</b></td>
        {players.map(player => <td className='td-center td-emphasis player-score'>{player.getTotalScore()}</td>)}
      </tr>
    </>
  );

  const getHead = () => {
    return (
      <>
        <th className="td-label">{'Upper Section'}</th>
        {players.map((player, i) => <th className="player-score">{player.name}</th>)}
      </>
    );
  }

  return (
    <table className={`scoreboard`}>
      <thead>
        {getHead()}
      </thead>
      {scoreArray.map(cat => getRow(cat))}
    </table>
  )
};

export default ScoreCard;