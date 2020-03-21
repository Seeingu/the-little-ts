import { SLat, SSet } from '../types';
import { isNull } from '../primary';
import { isMember, car, cdr, cons, multirember, and, or } from '../util';

export const isSet = (lat: SLat): boolean => {
  if (isNull(lat)) return true;
  if (isMember(car(lat), cdr(lat) as SLat)) return false;
  return isSet(cdr(lat) as SLat);
};

export const makeset = (lat: SLat): SSet => {
  if (isNull(lat)) return [];
  return cons(car(lat), makeset(multirember(car(lat), cdr(lat) as SLat)));
};

export const isSubset = (set1: SSet, set2: SSet): boolean => {
  if (isNull(set1)) return true;
  return and(isMember(car(set1), set2), isSubset(cdr(set1) as SSet, set2));
};

export const isEqset = (set1: SSet, set2: SSet): boolean => {
  return and(isSubset(set1, set2), isSubset(set2, set1));
};

export const isIntersect = (set1: SSet, set2: SSet): boolean => {
  if (or(isNull(set1), isNull(set2))) return false;
  return or(isMember(car(set1), set2), isIntersect(cdr(set1) as SSet, set2));
};

export const intersect = (set1: SSet, set2: SSet): SSet => {
  if (or(isNull(set1), isNull(set2))) return [];
  if (isMember(car(set1), set2)) {
    return cons(car(set1), intersect(cdr(set1) as SSet, set2));
  }
  return intersect(cdr(set1) as SSet, set2);
};

export const union = (set1: SSet, set2: SSet): SSet => {
  if (isNull(set1)) return set2;
  if (isMember(car(set1), set2)) {
    return union(cdr(set1) as SSet, set2);
  }
  return cons(car(set1), union(cdr(set1) as SSet, set2));
};

export const intersectall = (setList: SSet[]): SSet => {
  if (isNull(cdr(setList))) return car(setList) as SSet;
  return intersect(car(setList) as SSet, intersectall(cdr(setList) as SSet[]));
};
