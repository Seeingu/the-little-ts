import _ from 'lodash';
import { SchemeConstants } from './consts';
import { isNull } from './primary';
import { SList, SAtom, SLat } from './types';
import { ArrayItem } from './types/typeFn';

export const car = <T extends SList>(
  lists: T
): SchemeConstants | ArrayItem<T> => {
  return lists[0] || SchemeConstants.Nil;
};

export const cdr = <T extends SList>(lists: T): SchemeConstants | SList => {
  if (lists.length === 0) return SchemeConstants.Nil;
  return lists.slice(1);
};

export const cons = (atom: SAtom | SList, lists: SList): SList => {
  return [atom, ...lists];
};

export const isEq = (v1: SAtom | SList, v2: SAtom | SList): boolean => {
  if (_.isNumber(v1) || _.isNumber(v2)) return false;
  if (_.isArray(v1) || _.isArray(v2)) return false;
  return _.isEqual(v1, v2);
};

export const or = (v1: boolean, v2: boolean): boolean => {
  return v1 || v2;
};

export const isMember = (atom: SAtom, list: SList): boolean => {
  if (isNull(list)) return false;
  else if (isEq(atom, car(list))) {
    return true;
  } else {
    return isMember(atom, cdr(list) as SList);
  }
};

export const rember = (atom: SAtom, lat: SLat): SLat | SchemeConstants => {
  if (isNull(lat)) return lat;
  if (isEq(car(lat), atom)) {
    return cdr(lat);
  }
  return cons(car(lat), rember(atom, cdr(lat) as SLat) as SLat);
};

export const multirember = (atom: SAtom, lat: SLat): SLat => {
  if (isNull(lat)) return lat;
  if (isEq(car(lat), atom)) {
    return multirember(atom, cdr(lat) as SLat);
  }
  return cons(car(lat), multirember(atom, cdr(lat) as SLat));
};

export const firsts = (list: SList): SList => {
  if (isNull(list)) return list;
  return cons(car(car(list) as SList), firsts(cdr(list) as SList));
};

export const insertR = (newAtom: SAtom, oldAtom: SAtom, lat: SLat): SLat => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(car(lat), cons(newAtom, cdr(lat) as SLat));
  }
  return cons(car(lat), insertR(newAtom, oldAtom, cdr(lat) as SLat));
};

export const multiinsertR = (
  newAtom: SAtom,
  oldAtom: SAtom,
  lat: SLat
): SLat => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(
      car(lat),
      cons(newAtom, multiinsertR(newAtom, oldAtom, cdr(lat) as SLat))
    );
  }
  return cons(car(lat), multiinsertR(newAtom, oldAtom, cdr(lat) as SLat));
};

export const insertL = (newAtom: SAtom, oldAtom: SAtom, lat: SLat): SLat => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(newAtom, lat);
  }
  return cons(car(lat), insertL(newAtom, oldAtom, cdr(lat) as SLat));
};

export const multiinsertL = (
  newAtom: SAtom,
  oldAtom: SAtom,
  lat: SLat
): SLat => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(
      newAtom,
      cons(car(lat), multiinsertL(newAtom, oldAtom, cdr(lat) as SLat))
    );
  }
  return cons(car(lat), multiinsertL(newAtom, oldAtom, cdr(lat) as SLat));
};

export const subst = (newAtom: SAtom, oldAtom: SAtom, lat: SLat): SLat => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(newAtom, cdr(lat) as SLat);
  }
  return cons(car(lat), subst(newAtom, oldAtom, cdr(lat) as SLat));
};

export const subst2 = (
  newAtom: SAtom,
  oldAtom1: SAtom,
  oldAtom2: SAtom,
  lat: SLat
): SLat => {
  if (isNull(lat)) return lat;
  if (or(isEq(oldAtom1, car(lat)), isEq(oldAtom2, car(lat)))) {
    return cons(newAtom, cdr(lat) as SLat);
  }
  return cons(car(lat), subst2(newAtom, oldAtom1, oldAtom2, cdr(lat) as SLat));
};

export const multisubst = (newAtom: SAtom, oldAtom: SAtom, lat: SLat): SLat => {
  if (isNull(lat)) return lat;
  if (isEq(oldAtom, car(lat))) {
    return cons(newAtom, multisubst(newAtom, oldAtom, cdr(lat) as SLat));
  }
  return cons(car(lat), multisubst(newAtom, oldAtom, cdr(lat) as SLat));
};
