import {
  isZero,
  opAdd,
  opSub,
  isTup,
  addTup,
  opMul,
  opTupAdd,
  opGreater,
  opSmaller,
  opEq,
  opExp,
  opDiv,
  isOne
} from '../utils/number';
describe('number', () => {
  test('isZero should works', () => {
    [12, -12, 12.3].forEach(num => {
      expect(isZero(num)).toBeFalsy();
    });
    [0, 0.0].forEach(num => {
      expect(isZero(num)).toBeTruthy();
    });
  });
  test('opAdd should works', () => {
    expect(opAdd(12, 13)).toEqual(25);
  });
  test('opSub should works', () => {
    expect(opSub(13, 12)).toEqual(1);
  });
  test('opMul should works', () => {
    expect(opMul(11, 10)).toEqual(110);
  });
  test('opGreater should works', () => {
    expect(opGreater(2, 1)).toBeTruthy();

    expect(opGreater(1, 2)).toBeFalsy();
    expect(opGreater(1, 1)).toBeFalsy();
  });
  test('opSmaller should works', () => {
    expect(opSmaller(1, 2)).toBeTruthy();

    expect(opSmaller(2, 1)).toBeFalsy();
    expect(opSmaller(1, 1)).toBeFalsy();
  });
  test('opEq should works', () => {
    expect(opEq(1, 1)).toBeTruthy();
    expect(opEq(1, 2)).toBeFalsy();
    expect(opEq(2, 1)).toBeFalsy();
  });
  test('opExp should works', () => {
    expect(opExp(2, 3)).toEqual(8);
  });
  test('opDiv should works', () => {
    expect(opDiv(2, 3)).toEqual(0);
    expect(opDiv(3, 2)).toEqual(1);
    expect(opDiv(25, 5)).toEqual(5);
  });
});

describe('tup', () => {
  test('isTup should works', () => {
    const truthyTups = [[], [1, 2, 3], [1, 23, 1.234]];
    truthyTups.forEach(tup => {
      expect(isTup(tup)).toBeTruthy();
    });
  });

  test('addTup should works', () => {
    const truthyPairs = [
      { tups: [1, 2, 3, 4], expected: 10 },
      { tups: [], expected: 0 }
    ];
    truthyPairs.forEach(pair => {
      expect(addTup(pair.tups)).toEqual(pair.expected);
    });
  });
  test('opTupAdd should works', () => {
    const truthyPairs = [
      {
        tup1: [1, 2, 3, 4],
        tup2: [2, 3, 4, 5],
        expected: [3, 5, 7, 9]
      },
      {
        tup1: [1, 2, 3],
        tup2: [1, 2],
        expected: [2, 4, 3]
      },
      {
        tup1: [],
        tup2: [],
        expected: []
      },
      {
        tup1: [],
        tup2: [1, 2, 3],
        expected: [1, 2, 3]
      }
    ];
    truthyPairs.forEach(pair => {
      expect(opTupAdd(pair.tup1, pair.tup2)).toEqual(pair.expected);
    });
  });
  test('isOne should works', () => {
    expect(isOne(1)).toBeTruthy();
    expect(isOne(112)).toBeFalsy();
  });
});
