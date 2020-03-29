import { isAtom, isNull, isList, isSExpression, isLat } from '../primary';

const lists = [[], ['abc', 123], []];
const nestedLists = [[[]], [[], 1, 2]];
const atoms = ['string', 123, 12.3, -12.3, 'a'];

describe('atom', () => {
  test('is atom', () => {
    atoms.forEach(atom => {
      expect(isAtom(atom)).toBeTruthy();
    });
  });
});

describe('list', () => {
  test('is list', () => {
    [...lists, ...nestedLists].forEach(list => {
      expect(isList(list)).toBeTruthy();
    });
  });
});

describe('s-expression', () => {
  test('is s-expression', () => {
    atoms.forEach(atom => {
      expect(isSExpression(atom)).toBeTruthy();
    });
    [...lists, ...nestedLists].forEach(list => {
      expect(isSExpression(list)).toBeTruthy();
    });
  });
});

describe('null', () => {
  test('is null', () => {
    atoms.forEach(atom => {
      expect(isNull(atom)).toBeFalsy();
    });
    expect(isNull([])).toBeTruthy();
    expect(isNull([[]])).toBeFalsy();
  });
});

describe('lat', () => {
  test('is lat', () => {
    const truthyLists = [[], ['a', 'b', 1]];
    truthyLists.forEach(list => {
      expect(isLat(list)).toBeTruthy();
    });
    const falsyLists = [
      [['a'], 'b', 'c'],
      ['a', ['b'], 'c']
    ];
    falsyLists.forEach(list => {
      expect(isLat(list)).toBeFalsy();
    });
  });
});
