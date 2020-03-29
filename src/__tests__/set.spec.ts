import {
  isSet,
  makeset,
  intersectall,
  isSubset,
  union,
  isEqset,
  isIntersect,
  intersect
} from '../utils/set';

test('isSet', () => {
  const truthyLats = [[], [1, 2, 3, 4]];
  truthyLats.forEach(lat => {
    expect(isSet(lat)).toBeTruthy();
  });
  const falsyLats = [[1, 2, 1]];
  falsyLats.forEach(lat => {
    expect(isSet(lat)).toBeFalsy();
  });
});

test('makeset', () => {
  const pairs = [
    { lat: [], expected: [] },
    { lat: [1, 2, 3], expected: [1, 2, 3] },
    { lat: [1, 2, 3, 1, 2], expected: [1, 2, 3] }
  ];
  pairs.forEach(pair => {
    expect(makeset(pair.lat)).toEqual(pair.expected);
  });
});

test('subset?', () => {
  const truthyPairs = [
    { set1: [], set2: [] },
    { set1: [1, 2, 3, 4], set2: [1, 2, 3, 4, 5] }
  ];
  const falsyPairs = [
    { set1: [1], set2: [] },
    { set1: [1, 2, 3], set2: [1, 2, 4] }
  ];
  truthyPairs.forEach(pair => {
    expect(isSubset(pair.set1, pair.set2)).toBeTruthy();
  });
  falsyPairs.forEach(pair => {
    expect(isSubset(pair.set1, pair.set2)).toBeFalsy();
  });
});

test('eqset?', () => {
  const truthyPairs = [
    { set1: [], set2: [] },
    { set1: [1, 2, 3, 4], set2: [1, 2, 3, 4] }
  ];
  const falsyPairs = [
    { set1: [1], set2: [] },
    { set1: [1, 2, 3], set2: [1, 2, 3, 4, 5] }
  ];
  truthyPairs.forEach(pair => {
    expect(isEqset(pair.set1, pair.set2)).toBeTruthy();
  });
  falsyPairs.forEach(pair => {
    expect(isEqset(pair.set1, pair.set2)).toBeFalsy();
  });
});

test('intersect?', () => {
  const truthyPairs = [
    { set1: [1, 2], set2: [1, 2] },
    { set1: [1, 2], set2: [1, 3, 1, 4] }
  ];
  const falsyPairs = [
    { set1: [0], set2: [] },
    { set1: [1], set2: [] },
    { set1: [1, 2, 3], set2: [4, 5, 6] }
  ];
  truthyPairs.forEach(pair => {
    expect(isIntersect(pair.set1, pair.set2)).toBeTruthy();
  });
  falsyPairs.forEach(pair => {
    expect(isIntersect(pair.set1, pair.set2)).toBeFalsy();
  });
});

test('intersect', () => {
  const pairs = [
    { set1: [], set2: [], expected: [] },
    { set1: [1], set2: [], expected: [] },
    { set1: [], set2: [1], expected: [] },
    { set1: [1, 2], set2: [1, 2], expected: [1, 2] },
    { set1: [1, 2], set2: [1, 3, 4], expected: [1] }
  ];
  pairs.forEach(pair => {
    expect(intersect(pair.set1, pair.set2)).toEqual(pair.expected);
  });
});

test('union', () => {
  const pairs = [
    { set1: [], set2: [], expected: [] },
    { set1: [1], set2: [], expected: [1] },
    { set1: [], set2: [1], expected: [1] },
    { set1: [1, 2], set2: [1, 2], expected: [1, 2] },
    { set1: [1, 2], set2: [1, 3, 4], expected: [1, 2, 3, 4] }
  ];
  pairs.forEach(pair => {
    // set order doesn't matter
    expect(union(pair.set1, pair.set2).sort()).toEqual(pair.expected.sort());
  });
});

test('intersectall', () => {
  const pairs = [
    {
      setList: [
        [1, 2, 3],
        [1, 3],
        [2, 3]
      ],
      expected: [3]
    },
    { setList: [[1, 2], [1], [2, 3]], expected: [] }
  ];
  pairs.forEach(pair => {
    expect(intersectall(pair.setList)).toEqual(pair.expected);
  });
});
