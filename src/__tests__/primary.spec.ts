import { isAtom, isNull, isList, isSExpression } from '../primary';
import { SchemeConstants } from '../consts';

const lists = [[], ['abc', 123], []];
const nestedLists = [[[]], [[], 1, 2]];
const atoms = ['string', 123, 12.3, 'a'];

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
      expect(isNull(atom)).toEqual(SchemeConstants.Nil);
    });
    expect(isNull([])).toBeTruthy();
    expect(isNull([[]])).toBeFalsy();
  });
});
