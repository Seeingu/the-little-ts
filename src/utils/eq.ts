import { isNumber, opEq } from './number';
import { and, isEq, car, cdr, or } from '../unit';
import { SList, SSExp, SAtom } from '../types';
import { isNull, isAtom } from '../primary';

export const isEqan = (atom1: SAtom, atom2: SAtom): boolean => {
  if (and(isNumber(atom1), isNumber(atom2))) {
    return opEq(atom1 as number, atom2 as number);
  }
  return isEq(atom1, atom2);
};

export const isEqlist = (list1: SList, list2: SList): boolean => {
  if (isNull(list1)) {
    if (isNull(list2)) return true;
    return false;
  }
  if (isNull(list2)) {
    return false;
  }
  // TODO: js cross reference issue: can simplify by calling isEqual
  if (and(isAtom(car(list1)), isAtom(car(list2)))) {
    if (isEqan(car(list1), car(list2))) {
      return isEqlist(cdr(list1) as SList, cdr(list2) as SList);
    }
  } else if (or(isAtom(car(list1)), isAtom(car(list2)))) {
    return false;
  }
  return and(
    isEqlist(car(list1), car(list2)),
    isEqlist(cdr(list1) as SList, cdr(list2) as SList)
  );
};

export const isEqual = (s1: SSExp, s2: SSExp): boolean => {
  if (and(isAtom(s1), isAtom(s2))) return isEqan(s1 as SAtom, s2 as SAtom);
  if (or(isAtom(s1), isAtom(s2))) {
    return false;
  }
  return isEqlist(s1 as SList, s2 as SList);
};
