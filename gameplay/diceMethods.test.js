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

