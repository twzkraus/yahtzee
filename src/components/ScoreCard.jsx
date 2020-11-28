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

const ScoreCard = ({ players, float }) => {
  const getScoreArray = () => {
    let result = [];
    for (let key in players[0].scores) {
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

  const getRow = (arrayEl) => {
    if (arrayEl[0] === 'mid') {
      return getUpperSummary();
    } else if (arrayEl[0] === 'end') {
      return getLowerSummary();
    }
    return (
      <tr>
        <td>{prettyNames[arrayEl[0]]}</td>
        {arrayEl.slice(1).map(el => <td className='td-center'>{el}</td>)}
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
        <td><b>{'Upper Section Bonus'}</b></td>
        {players.map(player => <td className='td-center'>{player.hasBonus() ? 35 : 0}</td>)}
      </tr>
      <tr>
        <td><b>{'Total With Bonus'}</b></td>
        {players.map(player => <td className='td-center td-emphasis'>{player.getFullUpperScore()}</td>)}
      </tr>
      <tr>
        <td>{''}</td>
        {players.map(p => <td>{''}</td> )}
      </tr>
      <tr>
        <td className='td-emphasis'>{'Lower Section'}</td>
        {players.map(p => <td className="td-empty">{''}</td> )}
      </tr>
    </>
  );

  const getLowerSummary = () => (
    <>
      <tr>
        <td><b>{'Upper Section Total'}</b></td>
        {players.map(player => <td className='td-center'>{player.getFullUpperScore()}</td>)}
      </tr>
      <tr>
        <td><b>{'Lower Section Total'}</b></td>
        {players.map(player => <td className='td-center'>{player.getLowerScore()}</td>)}
      </tr>
      <tr>
        <td><b>{'Grand Total'}</b></td>
        {players.map(player => <td className='td-center td-emphasis'>{player.getTotalScore()}</td>)}
      </tr>
    </>
  );

  const getHead = () => {
    return (
      <>
        <th>{'Upper Section'}</th>
        {players.map((player, i) => <th>{player.name}</th>)}
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