import _ from 'lodash';
import { SchemeConstants } from './consts';
import { isNull } from './primary';

export const car = (lists: unknown): unknown => {
  if (!_.isArray(lists)) return SchemeConstants.Nil;
  return lists[0] || SchemeConstants.Nil;
};

export const cdr = (lists: unknown): unknown => {
  if (!_.isArray(lists)) return SchemeConstants.Nil;
  if (lists.length === 0) return SchemeConstants.Nil;
  return lists.slice(1);
};

export const cons = (atom: unknown, lists: unknown[] | unknown): unknown => {
  if (!_.isArray(lists)) return SchemeConstants.Nil;
  return [atom, ...lists];
};

export const isEq = (v1: unknown, v2: unknown): boolean => {
  if (_.isNumber(v1) || _.isNumber(v2)) return false;
  if (_.isArray(v1) || _.isArray(v2)) return false;
  return _.isEqual(v1, v2);
};

export const or = (v1: boolean, v2: boolean): boolean => {
  return v1 || v2;
};

export const isMember = (atom: unknown, list: unknown): boolean => {
  if (isNull(list)) return false;
  else if (isEq(atom, car(list))) {
    return true;
  } else {
    return isMember(atom, cdr(list));
  }
};

export const rember = (atom: unknown, lat: unknown): unknown => {
  if (isNull(lat)) return lat;
  if (isEq(car(lat), atom)) {
    return cdr(lat);
  }
  return cons(car(lat), rember(atom, cdr(lat)));
};

export const multirember = (atom: unknown, lat: unknown): unknown => {
  if (isNull(lat)) return lat;
  if (isEq(car(lat), atom)) {
    return multirember(atom, cdr(lat));
  }
  return cons(car(lat), multirember(atom, cdr(lat)));
};

export const firsts = (list: unknown): unknown => {
  if (isNull(list)) return list;
  return cons(car(car(list)), firsts(cdr(list)));
};

export const insertR = (
  newAtom: unknown,
  oldAtom: unknown,
  lat: unknown
): unknown => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(car(lat), cons(newAtom, cdr(lat)));
  }
  return cons(car(lat), insertR(newAtom, oldAtom, cdr(lat)));
};

export const multiinsertR = (
  newAtom: unknown,
  oldAtom: unknown,
  lat: unknown
): unknown => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(
      car(lat),
      cons(newAtom, multiinsertR(newAtom, oldAtom, cdr(lat)))
    );
  }
  return cons(car(lat), multiinsertR(newAtom, oldAtom, cdr(lat)));
};

export const insertL = (
  newAtom: unknown,
  oldAtom: unknown,
  lat: unknown
): unknown => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(newAtom, lat);
  }
  return cons(car(lat), insertL(newAtom, oldAtom, cdr(lat)));
};

export const multiinsertL = (
  newAtom: unknown,
  oldAtom: unknown,
  lat: unknown
): unknown => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(
      newAtom,
      cons(car(lat), multiinsertL(newAtom, oldAtom, cdr(lat)))
    );
  }
  return cons(car(lat), multiinsertL(newAtom, oldAtom, cdr(lat)));
};

export const subst = (
  newAtom: unknown,
  oldAtom: unknown,
  lat: unknown
): unknown => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(newAtom, cdr(lat));
  }
  return cons(car(lat), subst(newAtom, oldAtom, cdr(lat)));
};

export const subst2 = (
  newAtom: unknown,
  oldAtom1: unknown,
  oldAtom2: unknown,
  lat: unknown
): unknown => {
  if (isNull(lat)) return lat;
  if (or(isEq(oldAtom1, car(lat)), isEq(oldAtom2, car(lat)))) {
    return cons(newAtom, cdr(lat));
  }
  return cons(car(lat), subst2(newAtom, oldAtom1, oldAtom2, cdr(lat)));
};

export const multisubst = (
  newAtom: unknown,
  oldAtom: unknown,
  lat: unknown
): unknown => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(newAtom, multisubst(newAtom, oldAtom, cdr(lat)));
  }
  return cons(car(lat), multisubst(newAtom, oldAtom, cdr(lat)));
};
