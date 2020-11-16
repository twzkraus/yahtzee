const {display, play, scoreHelpers} = require('./diceMethods.js');

test('properly identifies a 4 of a kind', () => {
  for (let j = 0; j < 3; j++) {
    let baseHand = [1, 2, 3, 4, 5, 6].slice(j, j + 4);
    for (let i = 1; i < 7; i++) {
      let thisHand = baseHand.concat(i).sort();
      let result = scoreHelpers.includesSmallStraight(thisHand);
      expect(result).toBe(true);
    }
  }
});

