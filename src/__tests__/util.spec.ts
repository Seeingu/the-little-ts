import {
  car,
  isEq,
  cdr,
  cons,
  isMember,
  rember,
  multirember,
  firsts,
  insertR,
  multiinsertR,
  insertL,
  multiinsertL,
  subst,
  multisubst,
  subst2,
  length,
  pick,
  rempick,
  noNums,
  allNums,
  eqan,
  occur
} from '../util';
import { SchemeConstants } from '../consts';
import { SList } from '../types';

describe('car', () => {
  test('should works with list', () => {
    const lists = [[], [0], [123, 12], [[123], 34]];
    const expected = [SchemeConstants.Nil, 0, 123, [123]];
    lists.forEach((list, index) => {
      expect(car(list)).toEqual(expected[index]);
    });
  });
  test('should works with nested car', () => {
    expect(car(car([[[123, 345]]]) as SList)).toEqual([123, 345]);
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
      }
    ];
    pairs.forEach(pair => {
      expect(cons(pair.atom, pair.list)).toEqual(pair.expected);
    });
  });
});

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
      expect(eqan(pair[0], pair[1])).toBeTruthy();
    });
    falsyPairs.forEach(pair => {
      expect(eqan(pair[0], pair[1])).toBeFalsy();
    });
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

describe('rember', () => {
  test('rember should works', () => {
    const pairs = [
      {
        atom: 'a',
        lat: [],
        expected: []
      },
      {
        atom: 'a',
        lat: ['a', 'b', 'c'],
        expected: ['b', 'c']
      },
      {
        atom: 'a',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'c', 'd']
      },
      {
        atom: 'a',
        lat: [['a'], 'b', 'c'],
        expected: [['a'], 'b', 'c']
      },
      {
        atom: 'a',
        lat: ['a', 'b', 'a'],
        expected: ['b', 'a']
      }
    ];
    pairs.forEach(pair => {
      expect(rember(pair.atom, pair.lat)).toEqual(pair.expected);
    });
  });

  test('multirember should works', () => {
    const pairs = [
      {
        atom: 'a',
        lat: [],
        expected: []
      },
      {
        atom: 'a',
        lat: ['a', 'b', 'c'],
        expected: ['b', 'c']
      },
      {
        atom: 'a',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'c', 'd']
      },
      {
        atom: 'a',
        lat: [['a'], 'b', 'c'],
        expected: [['a'], 'b', 'c']
      },
      {
        atom: 'a',
        lat: ['a', 'b', 'a', 'c', 'a'],
        expected: ['b', 'c']
      }
    ];
    pairs.forEach(pair => {
      expect(multirember(pair.atom, pair.lat)).toEqual(pair.expected);
    });
  });
});

describe('first', () => {
  test('first should works', () => {
    const pairs = [
      {
        list: [
          ['a', 'b'],
          ['c', 'd'],
          ['e', 'f']
        ],
        expected: ['a', 'c', 'e']
      },
      {
        list: [[['a']], ['b', 'c'], ['d', 'e']],
        expected: [['a'], 'b', 'd']
      }
    ];
    pairs.forEach(pair => {
      expect(firsts(pair.list)).toEqual(pair.expected);
    });
  });
});

describe('insertR', () => {
  test('insertR should works', () => {
    const pairs = [
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: [],
        expected: []
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'a', 'c', 'd']
      },
      {
        newAtom: 'a',
        oldAtom: 'c',
        lat: ['b', 'c', 'd', 'c'],
        expected: ['b', 'c', 'a', 'd', 'c']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['c', 'd', 'e'],
        expected: ['c', 'd', 'e']
      }
    ];
    pairs.forEach(pair => {
      expect(insertR(pair.newAtom, pair.oldAtom, pair.lat)).toEqual(
        pair.expected
      );
    });
  });

  test('multiinsertR should works', () => {
    const pairs = [
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: [],
        expected: []
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'a', 'c', 'd']
      },
      {
        newAtom: 'a',
        oldAtom: 'c',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'c', 'a', 'd']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['c', 'd', 'e'],
        expected: ['c', 'd', 'e']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['b', 'c', 'b', 'd'],
        expected: ['b', 'a', 'c', 'b', 'a', 'd']
      }
    ];
    pairs.forEach(pair => {
      expect(multiinsertR(pair.newAtom, pair.oldAtom, pair.lat)).toEqual(
        pair.expected
      );
    });
  });
});

describe('insertL', () => {
  test('insertL should works', () => {
    const pairs = [
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: [],
        expected: []
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['b', 'c', 'd'],
        expected: ['a', 'b', 'c', 'd']
      },
      {
        newAtom: 'a',
        oldAtom: 'c',
        lat: ['b', 'c', 'd', 'c'],
        expected: ['b', 'a', 'c', 'd', 'c']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['c', 'd', 'e'],
        expected: ['c', 'd', 'e']
      }
    ];
    pairs.forEach(pair => {
      expect(insertL(pair.newAtom, pair.oldAtom, pair.lat)).toEqual(
        pair.expected
      );
    });
  });
  test('multiinsertL should works', () => {
    const pairs = [
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: [],
        expected: []
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['b', 'c', 'd'],
        expected: ['a', 'b', 'c', 'd']
      },
      {
        newAtom: 'a',
        oldAtom: 'c',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'a', 'c', 'd']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['c', 'd', 'e'],
        expected: ['c', 'd', 'e']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['b', 'c', 'b', 'd'],
        expected: ['a', 'b', 'c', 'a', 'b', 'd']
      }
    ];
    pairs.forEach(pair => {
      expect(multiinsertL(pair.newAtom, pair.oldAtom, pair.lat)).toEqual(
        pair.expected
      );
    });
  });
});

describe('subst', () => {
  test('subst should works', () => {
    const pairs = [
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: [],
        expected: []
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['b', 'c', 'd'],
        expected: ['a', 'c', 'd']
      },
      {
        newAtom: 'a',
        oldAtom: 'c',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'a', 'd']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['c', 'd', 'e'],
        expected: ['c', 'd', 'e']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['b', 'c', 'b', 'd'],
        expected: ['a', 'c', 'b', 'd']
      }
    ];
    pairs.forEach(pair => {
      expect(subst(pair.newAtom, pair.oldAtom, pair.lat)).toEqual(
        pair.expected
      );
    });
  });

  test('subst2 should works', () => {
    const pairs = [
      {
        newAtom: 'a',
        oldAtom1: 'b',
        oldAtom2: 'b',
        lat: [],
        expected: []
      },
      {
        newAtom: 'a',
        oldAtom1: 'b',
        oldAtom2: 'c',
        lat: ['b', 'c', 'd'],
        expected: ['a', 'c', 'd']
      },
      {
        newAtom: 'a',
        oldAtom1: 'c',
        oldAtom2: 'd',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'a', 'd']
      },
      // oldAtom2 occur before oldAtom1
      {
        newAtom: 'a',
        oldAtom1: 'd',
        oldAtom2: 'c',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'a', 'd']
      },
      {
        newAtom: 'a',
        oldAtom1: 'b',
        oldAtom2: 'f',
        lat: ['c', 'd', 'e'],
        expected: ['c', 'd', 'e']
      },
      {
        newAtom: 'a',
        oldAtom1: 'b',
        oldAtom2: 'c',
        lat: ['b', 'c', 'b', 'b', 'e'],
        expected: ['a', 'c', 'b', 'b', 'e']
      }
    ];
    pairs.forEach(pair => {
      expect(
        subst2(pair.newAtom, pair.oldAtom1, pair.oldAtom2, pair.lat)
      ).toEqual(pair.expected);
    });
  });

  test('multisubst should works', () => {
    const pairs = [
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: [],
        expected: []
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['b', 'c', 'd'],
        expected: ['a', 'c', 'd']
      },
      {
        newAtom: 'a',
        oldAtom: 'c',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'a', 'd']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['c', 'd', 'e'],
        expected: ['c', 'd', 'e']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        lat: ['b', 'c', 'b', 'b', 'e'],
        expected: ['a', 'c', 'a', 'a', 'e']
      }
    ];
    pairs.forEach(pair => {
      expect(multisubst(pair.newAtom, pair.oldAtom, pair.lat)).toEqual(
        pair.expected
      );
    });
  });
});

describe('lat', () => {
  test('length should works', () => {
    expect(length([])).toEqual(0);
    expect(length(['a', 'b', 'c'])).toEqual(3);
  });
  test('pick should works', () => {
    expect(pick(0, ['a'])).toEqual(SchemeConstants.Nil);
    expect(pick(1, ['a', 'b'])).toEqual('a');
    expect(pick(3, ['a', 'b'])).toEqual(SchemeConstants.Nil);
  });
  test('rempick should works', () => {
    expect(rempick(1, ['a', 'b', 'c'])).toEqual(['b', 'c']);
    expect(rempick(1, [])).toEqual(SchemeConstants.Nil);
  });
  test('noNums should works', () => {
    expect(noNums([])).toEqual([]);
    expect(noNums(['a', 1, 2.5, 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });
  test('allNums should works', () => {
    expect(allNums([])).toEqual([]);
    expect(allNums(['a', 1, 2.5, 'b', 'c'])).toEqual([1, 2.5]);
  });
  test('occur should works', () => {
    expect(occur(1, [1, 2, 3, 1, 'a'])).toEqual(2);
    expect(occur(0, [0, 1, 2, 0, 0])).toEqual(3);
    expect(occur(1, [])).toEqual(0);
  });
});
