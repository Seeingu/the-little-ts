import { SchemeConstants } from '../consts';
import { car, cdr, cons } from '../unit';
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
