import { car, isEq, cdr, cons, or, isMember } from '../util';
import { SchemeConstants } from '../consts';

const nonLists = ['a', 123];

describe('car', () => {
  test('should works with list', () => {
    const lists = [[], [123, 12], [[123], 34]];
    const expected = [SchemeConstants.Nil, 123, [123]];
    lists.forEach((list, index) => {
      expect(car(list)).toEqual(expected[index]);
    });
  });
  test('should works with non list', () => {
    nonLists.forEach(param => {
      expect(car(param)).toEqual(SchemeConstants.Nil);
    });
  });
  test('should works with nested car', () => {
    expect(car(car([[[123, 345]]]))).toEqual([123, 345]);
  });
});

describe('cdr', () => {
  test('should works with list', () => {
    const lists = [[], [123, 12], [[123], [34]]];
    const expected = [SchemeConstants.Nil, [12], [[34]]];
    lists.forEach((list, index) => {
      expect(cdr(list)).toEqual(expected[index]);
    });
  });
  test('should works with non list', () => {
    nonLists.forEach(nonList => {
      expect(cdr(nonList)).toEqual(SchemeConstants.Nil);
    });
  });
});

describe('cons', () => {
  test('should works', () => {
    const pairs = [
      {
        atom: 'a',
        list: [],
        expected: ['a']
      },
      {
        atom: ['a'],
        list: ['b', 'c'],
        expected: [['a'], 'b', 'c']
      },
      {
        atom: 'a',
        list: 'b',
        expected: SchemeConstants.Nil
      }
    ];
    pairs.forEach(pair => {
      expect(cons(pair.atom, pair.list)).toEqual(pair.expected);
    });
  });
});

describe('eq', () => {
  test('should works', () => {
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
});

describe('or', () => {
  test('should works', () => {
    expect(or(true, false)).toBeTruthy();
    expect(or(false, true)).toBeTruthy();
    expect(or(false, false)).toBeFalsy();
  });
});

describe('member', () => {
  test('should works', () => {
    const truthyPairs = [
      {
        atom: 'a',
        list: ['a', 'b']
      },
      {
        atom: 'a',
        list: ['b', 'a', 'c']
      }
    ];
    truthyPairs.forEach(pair => {
      expect(isMember(pair.atom, pair.list)).toBeTruthy();
    });
    const falsyPairs = [
      {
        atom: 'b',
        list: ['a', ['c', 'b'], 'd']
      },
      { atom: 'a', list: ['b', 'c', 'd'] },
      {
        atom: 'a',
        list: ['b', 'c', ['d', 'e']]
      }
    ];
    falsyPairs.forEach(pair => {
      expect(isMember(pair.atom, pair.list)).toBeFalsy();
    });
  });
});
