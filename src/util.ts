import _ from 'lodash';
import { SchemeConstants } from './consts';
import { isNull, isAtom } from './primary';
import { SList, SAtom, SLat, STup, SSExp } from './types';
import { ArrayItem } from './types/typeFn';
import {
  add1,
  isZero,
  sub1,
  isNumber,
  opEq,
  isOne,
  opAdd
} from './utils/number';

/** @unit */
export const car = <T extends SList>(
  lists: T
): SchemeConstants | ArrayItem<T> => {
  return _.isNil(lists[0]) ? SchemeConstants.Nil : lists[0];
};

/** @unit */
export const cdr = <T extends SList>(lists: T): SchemeConstants | SList => {
  if (!_.isArray(lists)) return SchemeConstants.Nil;
  if (lists.length === 0) return SchemeConstants.Nil;
  return lists.slice(1);
};

/** @unit */
export const cons = (atom: SAtom | SList, lists: SList): SList => {
  return [atom, ...lists];
};

/** @unit */
export const isEq = (v1: SAtom | SList, v2: SAtom | SList): boolean => {
  if (_.isNumber(v1) || _.isNumber(v2)) return false;
  if (_.isArray(v1) || _.isArray(v2)) return false;
  return _.isEqual(v1, v2);
};

/** @unit */
export const or = (v1: boolean, v2: boolean): boolean => {
  return v1 || v2;
};
/** @unit */
export const and = (
  v1: boolean | SchemeConstants,
  v2: boolean | SchemeConstants
): boolean => {
  if (v1 === SchemeConstants.Nil) {
    return v2 === SchemeConstants.Nil;
  }
  return (v1 as boolean) && (v2 as boolean);
};

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

export const isMember = (atom: SAtom, list: SList): boolean => {
  if (isNull(list)) return false;
  else if (isEqual(atom, car(list))) {
    return true;
  } else {
    return isMember(atom, cdr(list) as SList);
  }
};

export const rember = (s: SSExp, lat: SLat): SLat | SchemeConstants => {
  if (isNull(lat)) return lat;
  if (isEqual(car(lat), s)) {
    return cdr(lat);
  }
  return cons(car(lat), rember(s, cdr(lat) as SLat) as SLat);
};

export const multirember = (atom: SAtom, lat: SLat): SLat => {
  if (isNull(lat)) return lat;
  if (isEqual(car(lat), atom)) {
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

export const length = (lat: SLat): number => {
  if (isNull(lat)) return 0;
  return add1(length(cdr(lat) as SLat));
};

export const pick = (index: number, lat: SLat): SAtom | SchemeConstants => {
  if (isZero(index)) return SchemeConstants.Nil;
  if (isOne(index)) return car(lat);
  return pick(sub1(index), cdr(lat) as SLat);
};

export const rempick = (index: number, lat: SLat): SLat | SchemeConstants => {
  if (isOne(index)) return cdr(lat);
  return cons(car(lat), rempick(sub1(index), cdr(lat) as SLat) as SLat);
};

export const noNums = (lat: SLat): SLat => {
  if (isNull(lat)) return [];
  if (isNumber(car(lat))) {
    return noNums(cdr(lat) as SLat);
  }
  return cons(car(lat), noNums(cdr(lat) as SLat));
};

export const allNums = (lat: SLat): STup => {
  if (isNull(lat)) return [];
  if (isNumber(car(lat))) {
    return cons(car(lat), allNums(cdr(lat) as SLat));
  }
  return allNums(cdr(lat) as SLat);
};

export const occur = (atom: SAtom, lat: SLat): number => {
  if (isNull(lat)) return 0;
  if (isEqan(atom, car(lat))) {
    return add1(occur(atom, cdr(lat) as SLat));
  }
  return occur(atom, cdr(lat) as SLat);
};

export const leftmost = (list: SList): SAtom | SchemeConstants => {
  if (isNull(list)) return SchemeConstants.Nil;
  if (isAtom(car(list))) {
    return car(list);
  }
  return leftmost(car(list));
};

export const remberStar = (atom: SAtom, list: SList): SList => {
  if (isNull(list)) return [];
  if (isAtom(car(list))) {
    if (isEqan(atom, car(list))) {
      return remberStar(atom, cdr(list) as SList);
    } else {
      return cons(car(list), remberStar(atom, cdr(list) as SList));
    }
  }
  return cons(
    remberStar(atom, car(list)),
    remberStar(atom, cdr(list) as SList)
  );
};

export const insertRStar = (
  newAtom: SAtom,
  oldAtom: SAtom,
  list: SList
): SList => {
  if (isNull(list)) return [];
  if (isAtom(car(list))) {
    if (isEqan(oldAtom, car(list))) {
      return cons(
        car(list),
        cons(newAtom, insertRStar(newAtom, oldAtom, cdr(list) as SList))
      );
    } else {
      return cons(car(list), insertRStar(newAtom, oldAtom, cdr(list) as SList));
    }
  }
  return cons(
    insertRStar(newAtom, oldAtom, car(list)),
    insertRStar(newAtom, oldAtom, cdr(list) as SList)
  );
};

export const insertLStar = (
  newAtom: SAtom,
  oldAtom: SAtom,
  list: SList
): SList => {
  if (isNull(list)) return [];
  if (isAtom(car(list))) {
    if (isEqan(oldAtom, car(list))) {
      return cons(
        newAtom,
        cons(car(list), insertLStar(newAtom, oldAtom, cdr(list) as SList))
      );
    } else {
      return cons(car(list), insertLStar(newAtom, oldAtom, cdr(list) as SList));
    }
  }
  return cons(
    insertLStar(newAtom, oldAtom, car(list)),
    insertLStar(newAtom, oldAtom, cdr(list) as SList)
  );
};

export const occurStar = (atom: SAtom, list: SList): number => {
  if (isNull(list)) return 0;
  if (isAtom(car(list))) {
    if (isEqan(atom, car(list))) {
      return add1(occurStar(atom, cdr(list) as SList));
    } else {
      return occurStar(atom, cdr(list) as SList);
    }
  }
  return opAdd(occurStar(atom, car(list)), occurStar(atom, cdr(list) as SList));
};

export const substStar = (
  newAtom: SAtom,
  oldAtom: SAtom,
  list: SList
): SList => {
  if (isNull(list)) return [];
  if (isAtom(car(list))) {
    if (isEqan(oldAtom, car(list))) {
      return cons(newAtom, substStar(newAtom, oldAtom, cdr(list) as SList));
    } else {
      return cons(car(list), substStar(newAtom, oldAtom, cdr(list) as SList));
    }
  }
  return cons(
    substStar(newAtom, oldAtom, car(list)),
    substStar(newAtom, oldAtom, cdr(list) as SList)
  );
};

export const isMemberStar = (atom: SAtom, list: SList): boolean => {
  if (isNull(list)) return false;
  if (isAtom(car(list))) {
    return or(isEqan(atom, car(list)), isMemberStar(atom, cdr(list) as SList));
  }
  return or(
    isMemberStar(atom, car(list)),
    isMemberStar(atom, cdr(list) as SList)
  );
};
