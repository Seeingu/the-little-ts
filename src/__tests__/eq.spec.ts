import { isEq } from '../unit';
import { isEqan, isEqlist, isEqual } from '../utils/eq';

describe('eq', () => {
  test('isEq should works', () => {
    const truthyPairs = [
      {
        v1: 'a1',
        v2: 'a1'
      }
    ];
    const falsyPairs = [
      {
        v1: 'a1',
        v2: 'a2'
      },
      {
        v1: 123,
        v2: 123
      },
      {
        v1: [1],
        v2: [1]
      }
    ];
    truthyPairs.forEach(pair => {
      expect(isEq(pair.v1, pair.v2)).toBeTruthy();
    });
    falsyPairs.forEach(pair => {
      expect(isEq(pair.v1, pair.v2)).toBeFalsy();
    });
  });
  test('eqan should works', () => {
    const truthyPairs = [
      [0, 0],
      [1, 1],
      [11, 11],
      ['a', 'a']
    ];
    const falsyPairs = [
      [1, '1'],
      ['a', 'ab']
    ];
    truthyPairs.forEach(pair => {
      expect(isEqan(pair[0], pair[1])).toBeTruthy();
    });
    falsyPairs.forEach(pair => {
      expect(isEqan(pair[0], pair[1])).toBeFalsy();
    });
  });
  test('eqlist', () => {
    const truthyPairs = [
      { list1: [], list2: [] },
      { list1: [1, 2, 3], list2: [1, 2, 3] },
      { list1: [[1], [2], [3, 4]], list2: [[1], [2], [3, 4]] },
      { list1: [[[1]], [2], [3, 4]], list2: [[[1]], [2], [3, 4]] }
    ];
    const falsyPairs = [
      { list1: [1], list2: [] },
      { list1: [[1, 2, 3]], list2: [[1, 2]] },
      { list1: [[1], [2, 3], [3, 4]], list2: [[1], [2], [3, 4]] },
      { list1: [[[]], [2], [3, 4]], list2: [[[1]], [2], [3, 4]] }
    ];
    truthyPairs.forEach(pair => {
      expect(isEqlist(pair.list1, pair.list2)).toBeTruthy();
    });
    falsyPairs.forEach(pair => {
      expect(isEqlist(pair.list1, pair.list2)).toBeFalsy();
    });
  });
  test('equal?', () => {
    const truthyPairs = [
      { s1: [], s2: [] },
      { s1: 1, s2: 1 },
      { s1: [1, 2, [[3]]], s2: [1, 2, [[3]]] }
    ];
    truthyPairs.forEach(pair => {
      expect(isEqual(pair.s1, pair.s2)).toBeTruthy();
    });
  });
});
