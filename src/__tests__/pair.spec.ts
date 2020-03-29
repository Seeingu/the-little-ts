import * as pairUtil from '../utils/pair';
import { SchemeConstants } from '../consts';
import { SPair } from '../types';

test('a-pair', () => {
  const truthyPairs = [
    [[], []],
    [1, 2],
    [
      [1, 2],
      [1, 3]
    ]
  ];
  truthyPairs.forEach(pair => {
    expect(pairUtil.isAPair(pair)).toBeTruthy();
  });
});

test('first', () => {
  const pairs = [
    { pair: [], expected: SchemeConstants.Nil },
    { pair: [1, 2], expected: 1 },
    { pair: [[1, 3], [12]], expected: [1, 3] }
  ];
  pairs.forEach(pair => {
    expect(pairUtil.first(pair.pair as SPair)).toEqual(pair.expected);
  });
});

test('second', () => {
  const pairs = [
    // { pair: [], expected: SchemeConstants.Nil },
    { pair: [1, 2], expected: 2 },
    { pair: [[1, 3], [12]], expected: [12] }
  ];
  pairs.forEach(pair => {
    expect(pairUtil.second(pair.pair as SPair)).toEqual(pair.expected);
  });
});

test('build', () => {
  const pairs = [
    {
      s1: [1],
      s2: [2],
      expected: [[1], [2]]
    },
    {
      s1: 12,
      s2: [2],
      expected: [12, [2]]
    }
  ];
  pairs.forEach(pair => {
    expect(pairUtil.build(pair.s1, pair.s2)).toEqual(pair.expected);
  });
});

test('fun?', () => {
  const truthyPairs = [
    {
      rel: [
        [1, 2],
        [2, 4]
      ]
    }
  ];
  truthyPairs.forEach(pair => {
    expect(pairUtil.isFun(pair.rel)).toBeTruthy();
  });
});

test('revrel', () => {
  const pairs = [
    {
      rel: [
        [1, 2],
        [3, 4],
        [5, 6]
      ],
      expected: [
        [2, 1],
        [4, 3],
        [6, 5]
      ]
    }
  ];
  pairs.forEach(pair => {
    expect(pairUtil.revrel(pair.rel)).toEqual(pair.expected);
  });
});

test('revpair', () => {
  const pairs = [
    {
      pair: [1, 2],
      expected: [2, 1]
    },
    {
      pair: [
        [1, 2],
        [3, 4]
      ],
      expected: [
        [3, 4],
        [1, 2]
      ]
    }
  ];
  pairs.forEach(pair => {
    expect(pairUtil.revpair(pair.pair as SPair)).toEqual(pair.expected);
  });
});

test('fun?', () => {
  const truthyPairs = [
    [
      [1, 2],
      [3, 4],
      [4, 4]
    ]
  ];
  truthyPairs.forEach(pair => {
    expect(pairUtil.isFun(pair)).toBeTruthy();
  });
});

test('fullfun?', () => {
  const truthyPairs = [
    [
      [1, 2],
      [3, 4],
      [3, 5]
    ]
  ];
  truthyPairs.forEach(pair => {
    expect(pairUtil.isFullfun(pair)).toBeTruthy();
  });
});
