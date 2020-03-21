import {
  car,
  isEq,
  cdr,
  cons,
  isMember,
  rember,
  multirember,
  remberStar,
  firsts,
  insertR,
  leftmost,
  multiinsertR,
  insertRStar,
  insertL,
  multiinsertL,
  isEqlist,
  isMemberStar,
  subst,
  multisubst,
  subst2,
  length,
  pick,
  occurStar,
  insertLStar,
  rempick,
  noNums,
  allNums,
  substStar,
  isEqan,
  isEqual,
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
      },
      {
        atom: 1,
        list: [2, 1]
      }
    ];
    truthyPairs.forEach(pair => {
      expect(isMember(pair.atom, pair.list)).toBeTruthy();
    });
    const falsyPairs = [
      { atom: 'b', list: [] },
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

  test('member* should works', () => {
    const truthyPairs = [
      {
        atom: 1,
        list: [1, 2, 3]
      },
      {
        atom: 1,
        list: [[1, 2, 3], [123]]
      },
      {
        atom: 1,
        list: [
          [2, 3, 4],
          [[2, 3, 1], [2]]
        ]
      }
    ];
    truthyPairs.forEach(pair => {
      expect(isMemberStar(pair.atom, pair.list)).toBeTruthy();
    });
  });
});

describe('rember', () => {
  test('rember should works', () => {
    const pairs = [
      {
        s: 'a',
        lat: [],
        expected: []
      },
      {
        s: 'a',
        lat: ['a', 'b', 'c'],
        expected: ['b', 'c']
      },
      {
        s: 'a',
        lat: ['b', 'c', 'd'],
        expected: ['b', 'c', 'd']
      },
      {
        s: 'a',
        lat: [['a'], 'b', 'c'],
        expected: [['a'], 'b', 'c']
      },
      {
        s: 'a',
        lat: ['a', 'b', 'a'],
        expected: ['b', 'a']
      },
      {
        s: ['a'],
        lat: ['a', 'b', ['a']],
        expected: ['a', 'b']
      }
    ];
    pairs.forEach(pair => {
      expect(rember(pair.s, pair.lat)).toEqual(pair.expected);
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
      },
      {
        atom: 1,
        lat: [1, 2, 1, 3, 1],
        expected: [2, 3]
      }
    ];
    pairs.forEach(pair => {
      expect(multirember(pair.atom, pair.lat)).toEqual(pair.expected);
    });
  });

  test('rember* should works', () => {
    const pairs = [
      {
        atom: 'a',
        list: [],
        expected: []
      },
      {
        atom: 'a',
        list: ['a', 'b', 'c'],
        expected: ['b', 'c']
      },
      {
        atom: 'a',
        list: [['a', 'b'], ['b', 'c', 'a'], ['c']],
        expected: [['b'], ['b', 'c'], ['c']]
      },
      {
        atom: 'a',
        list: [[['a', 'b']], [['b', 'c', 'a']], ['c']],
        expected: [[['b']], [['b', 'c']], ['c']]
      }
    ];
    pairs.forEach(pair => {
      expect(remberStar(pair.atom, pair.list)).toEqual(pair.expected);
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

  test('insertR* should works', () => {
    const pairs = [
      {
        newAtom: 'a',
        oldAtom: 'b',
        list: [],
        expected: []
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        list: ['b', 'c', 'b'],
        expected: ['b', 'a', 'c', 'b', 'a']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        list: [['b'], ['a', 'b'], ['c', 'd']],
        expected: [
          ['b', 'a'],
          ['a', 'b', 'a'],
          ['c', 'd']
        ]
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        list: [[['b']], ['a', 'b'], ['c', 'd']],
        expected: [[['b', 'a']], ['a', 'b', 'a'], ['c', 'd']]
      }
    ];
    pairs.forEach(pair => {
      expect(insertRStar(pair.newAtom, pair.oldAtom, pair.list)).toEqual(
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

  test('insertL* should works', () => {
    const pairs = [
      {
        newAtom: 'a',
        oldAtom: 'b',
        list: [],
        expected: []
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        list: ['b', 'c', 'b'],
        expected: ['a', 'b', 'c', 'a', 'b']
      },
      {
        newAtom: 'a',
        oldAtom: 'b',
        list: [['b'], ['a', 'b'], ['c', 'd'], [['b', 'c']]],
        expected: [['a', 'b'], ['a', 'a', 'b'], ['c', 'd'], [['a', 'b', 'c']]]
      }
    ];
    pairs.forEach(pair => {
      expect(insertLStar(pair.newAtom, pair.oldAtom, pair.list)).toEqual(
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
  test('subst* should works', () => {
    const pairs = [
      {
        newAtom: 'a',
        oldAtom: 'b',
        list: [],
        expected: []
      },
      {
        newAtom: 1,
        oldAtom: 2,
        list: [1, 2, 3, 2, 4, 2],
        expected: [1, 1, 3, 1, 4, 1]
      },
      {
        newAtom: 1,
        oldAtom: 2,
        list: [
          [2, 2, 2],
          [1, 2, 3],
          [2, [1, 2]]
        ],
        expected: [
          [1, 1, 1],
          [1, 1, 3],
          [1, [1, 1]]
        ]
      }
    ];
    pairs.forEach(pair => {
      expect(substStar(pair.newAtom, pair.oldAtom, pair.list)).toEqual(
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
});

describe('occur', () => {
  test('occur should works', () => {
    const pairs = [
      { atom: 1, lat: [1, 2, 3, 1, 'a'], expected: 2 },
      { atom: 0, lat: [0, 1, 2, 0, 0], expected: 3 },
      { atom: 1, lat: [], expected: 0 }
    ];
    pairs.forEach(pair => {
      expect(occur(pair.atom, pair.lat)).toEqual(pair.expected);
    });
  });
  test('occur* should works', () => {
    const pairs = [
      { atom: 1, list: [], expected: 0 },
      { atom: 1, list: [1, 2, 3, 4, 1, 2, 1], expected: 3 },
      { atom: 1, list: [[1, 2, [1]], [1, 2], 3, [4]], expected: 3 }
    ];
    pairs.forEach(pair => {
      expect(occurStar(pair.atom, pair.list)).toEqual(pair.expected);
    });
  });
});

describe('leftmost', () => {
  test('leftmost', () => {
    const pairs = [
      {
        list: [],
        expected: SchemeConstants.Nil
      },
      {
        list: [[[[]]], 1, 2, 3],
        expected: SchemeConstants.Nil
      },
      {
        list: [[1], [12], 23],
        expected: 1
      },
      {
        list: [[[[1]]], 14, 23],
        expected: 1
      }
    ];
    pairs.forEach(pair => {
      expect(leftmost(pair.list)).toEqual(pair.expected);
    });
  });
});
