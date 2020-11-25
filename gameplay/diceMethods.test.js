const {display, play} = require('./diceMethods.js');

test('properly identifies a 3 of a kind', () => {
  for (let i = 1; i < 7; i++) {
    let hand = [];
    while (hand.length < 3) {
      hand.push(i);
    }
    hand.push(Math.floor(Math.random() * 6));
    hand.push(Math.floor(Math.random() * 6));
    let thisHand = hand.sort();
    let result = play.getAllScores(thisHand);
    expect(result['3ok']).toBeGreaterThan(0);
  }
});

test('properly identifies a 4 of a kind', () => {
  for (let i = 1; i < 7; i++) {
    let hand = [];
    while (hand.length < 4) {
      hand.push(i);
    }
    hand.push(Math.floor(Math.random() * 6));
    let thisHand = hand.sort();
    let result = play.getAllScores(thisHand);
    expect(result['4ok']).toBeGreaterThan(0);
  }
});

test('properly identifies a small straight', () => {
  for (let first = 1; first <= 3; first++) {
    let hand = [first];
    while (hand.length < 4) {
      hand.push(first + hand.length);
    }
    for (let j = 1; j <= 6; j++) {
      hand.push(j);
      let result = play.getAllScores(hand);
      expect(result['smallStraight']).toBe(30);
    }
  }
});

test('properly identifies a large straight', () => {
  for (let first = 1; first <= 2; first++) {
    let hand = [first];
    while (hand.length < 5) {
      hand.push(first + hand.length);
    }
    let result = play.getAllScores(hand);
    expect(result['largeStraight']).toBe(40);
  }
});

test('properly identifies a yahtzee', () => {
  for (let num = 1; num <= 6; num++) {
    let hand = [];
    while (hand.length < 5) {
      hand.push(num);
    }
    let result = play.getAllScores(hand);
    expect(result['yahtzee']).toBe(50);
  }
});

test('properly identifies a full house', () => {
  for (let num1 = 1; num1 <= 6; num1++) {
    for (let num2 = 1; num2 <= 6; num2++) {
      let hand = [];
      while (hand.length < 3) {
        hand.push(num1);
      }
      while (hand.length < 5) {
        hand.push(num2);
      }
      let result = play.getAllScores(hand);
      expect(result['fullHouse']).toBe(25);
    }
  }
});

test('doesn\'t yield small straight for 1, 2, 3, 5, 6', () => {
  let hand = [1, 2, 3, 5, 6];
  let result = play.getAllScores(hand);
  expect(result['smallStraight']).toBeLessThan(30);
});

test('allows small straight for 1, 2, 3, 4, 6', () => {
  let hand = [1, 2, 3, 4, 6];
  let result = play.getAllScores(hand);
  expect(result['smallStraight']).toBe(30);
});
