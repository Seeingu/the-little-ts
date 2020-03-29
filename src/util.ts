import _ from 'lodash';
import { SchemeConstants } from './consts';
import { isNull, isAtom } from './primary';
import { SList, SAtom, SLat, STup } from './types';
import { add1, isZero, sub1, isNumber, isOne, opAdd } from './utils/number';
import { insertG, remberF, multiremberF } from './utils/fun';
import { isEq, car, cdr, or, cons } from './unit';
import { isEqan, isEqual } from './utils/eq';

export const isMember = (atom: SAtom, list: SList): boolean => {
  if (isNull(list)) return false;
  else if (isEqual(atom, car(list))) {
    return true;
  } else {
    return isMember(atom, cdr(list) as SList);
  }
};

export const rember = remberF(isEqual);

export const multirember = multiremberF(isEqual);

export const firsts = (list: SList): SList => {
  if (isNull(list)) return list;
  return cons(car(car(list) as SList), firsts(cdr(list) as SList));
};

export const insertR = insertG((newS, oldS, list) =>
  cons(oldS, cons(newS, list))
);

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

export const insertL = insertG((newS, oldS, list) =>
  cons(newS, cons(oldS, list))
);

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

export const subst = insertG((newS, _oldS, list) => cons(newS, list));

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
