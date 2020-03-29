import { SList, SSExp, SAtom, SLat } from '../types';
import { isNull, isAtom } from '../primary';
import { car, cdr, cons } from '../unit';
import { isEqual } from './eq';
import { add1, opMul, opAdd } from './number';

/** @unit */
export const isEven = (n: number) => n % 2 === 0;

export const remberF = (fun: (s1: SSExp, s2: SSExp) => boolean) => (
  s: SSExp,
  list: SList
): SList => {
  if (isNull(list)) return [];
  if (fun(car(list), s)) {
    return cdr(list) as SList;
  }
  return cons(car(list), remberF(fun)(s, cdr(list) as SList));
};

export const multiremberF = (fun: (s1: SSExp, s2: SSExp) => boolean) => (
  s: SSExp,
  list: SList
): SList => {
  if (isNull(list)) return [];
  if (fun(car(list), s)) {
    return multiremberF(fun)(s, cdr(list) as SList);
  }
  return cons(car(list), multiremberF(fun)(s, cdr(list) as SList));
};

export const multiremberT = (
  fun: (s: SSExp) => boolean,
  list: SList
): SList => {
  if (isNull(list)) return [];
  if (fun(car(list))) {
    return multiremberT(fun, cdr(list) as SList);
  }
  return cons(car(list), multiremberT(fun, cdr(list) as SList));
};

export const insertG = (
  seq: (newS: SSExp, oldS: SSExp, list: SList) => SList
) => (newS: SSExp, oldS: SSExp, list: SList): SList => {
  if (isNull(list)) return list;
  if (isEqual(oldS, car(list))) {
    return seq(newS, oldS, cdr(list) as SList);
  }
  return cons(car(list), insertG(seq)(newS, oldS, cdr(list) as SList));
};

export const multiremberCo = <RT extends any>(
  a: SAtom,
  lat: SLat,
  col: (lat1: SLat, lat2: SLat) => RT
): RT => {
  if (isNull(lat)) return col([], []);
  if (isEqual(car(lat), a)) {
    return multiremberCo(a, cdr(lat) as SLat, (newLat: SLat, seen: SLat) =>
      col(newLat, cons(car(lat), seen))
    );
  }
  return multiremberCo(a, cdr(lat) as SLat, (newLat: SLat, seen: SLat) =>
    col(cons(car(lat), newLat), seen)
  );
};

export const multiinsertLRCo = <RT extends any>(
  newAtom: SAtom,
  oldL: SAtom,
  oldR: SAtom,
  lat: SLat,
  col: (lat: SLat, lCount: number, rCount: number) => RT
): RT => {
  if (isNull(lat)) return col([], 0, 0);
  if (isEqual(car(lat), oldL)) {
    return multiinsertLRCo(
      newAtom,
      oldL,
      oldR,
      cdr(lat) as SLat,
      (newLat: SLat, newLCount: number, newRCount: number) => {
        return col(
          cons(newAtom, cons(oldL, newLat)),
          add1(newLCount),
          newRCount
        );
      }
    );
  }
  if (isEqual(car(lat), oldR)) {
    return multiinsertLRCo(
      newAtom,
      oldL,
      oldR,
      cdr(lat) as SLat,
      (newLat: SLat, newLCount: number, newRCount: number) => {
        return col(
          cons(oldR, cons(newAtom, newLat)),
          newLCount,
          add1(newRCount)
        );
      }
    );
  }
  return multiinsertLRCo(
    newAtom,
    oldL,
    oldR,
    cdr(lat) as SLat,
    (newLat: SLat, newLCount: number, newRCount: number) => {
      return col(cons(car(lat), newLat), newLCount, newRCount);
    }
  );
};

export const evensOnlyStarCo = <RT extends any>(
  list: SList,
  col: (list: SList, evenProduct: number, oddSum: number) => RT
): RT => {
  if (isNull(list)) return col([], 1, 0);
  if (isAtom(car(list))) {
    if (isEven(car(list))) {
      return evensOnlyStarCo(cdr(list) as SList, (newList, p, s) => {
        return col(cons(car(list), newList), opMul(car(list), p), s);
      });
    }
    return evensOnlyStarCo(cdr(list) as SList, (newList, p, s) => {
      return col(newList, p, opAdd(car(list), s));
    });
  }
  return evensOnlyStarCo(car(list), (al, ap, as) => {
    return evensOnlyStarCo(cdr(list) as SList, (dl, dp, ds) => {
      return col(cons(al, dl), opMul(ap, dp), opAdd(as, ds));
    });
  });
};
