import { SAtom, SLat, SPair } from '../types';
import { pick } from '../util';
import {
  isNumber,
  opAdd,
  opMul,
  isOne,
  opDiv,
  add1,
  isZero,
  sub1
} from './number';
import { isEq } from '../unit';
import { build, first, second, isAPair, revpair } from './pair';
import { isAtom } from '../primary';
import { isEven } from './fun';

type SPairOrAtom = SPair | SAtom;

export const keepLooking = (
  atom: SAtom,
  stringOrNumber: string | number,
  lat: SLat
): boolean => {
  if (isNumber(stringOrNumber)) {
    return keepLooking(atom, pick(stringOrNumber, lat), lat);
  }
  return isEq(atom, stringOrNumber);
};

export const looking = (atom: SAtom, lat: SLat): boolean => {
  return keepLooking(atom, pick(1, lat), lat);
};

export const eternity = (x: any): never => {
  return eternity(x);
};

export const shift = (pair: SPair): SPair => {
  return build(
    first(first(pair) as SPair),
    build(second(first(pair) as SPair), second(pair))
  );
};

export const align = (pairOrAtom: SPairOrAtom): SPairOrAtom => {
  if (isAtom(pairOrAtom)) return pairOrAtom;
  if (isAPair(first(pairOrAtom as SPair))) {
    return align(shift(pairOrAtom as SPair));
  }
  return build(
    first(pairOrAtom as SPair),
    align(second(pairOrAtom as SPair) as any)
  );
};

export const weightStar = (pairOrAtom: SPairOrAtom): number => {
  if (isAtom(pairOrAtom)) return 1;
  return opAdd(
    opMul(weightStar(first(pairOrAtom as SPair) as SPairOrAtom), 2),
    weightStar(second(pairOrAtom as SPair) as SPairOrAtom)
  );
};

export const shuffle = (pairOrAtom: SPairOrAtom): SPairOrAtom => {
  if (isAtom(pairOrAtom)) return pairOrAtom;
  if (isAPair(first(pairOrAtom as SPair))) {
    return shuffle(revpair(pairOrAtom as SPair));
  }
  return build(
    first(pairOrAtom as SPair),
    shuffle(second(pairOrAtom as SPair) as any)
  );
};

export const C = (n: number): number => {
  if (isOne(n)) return 1;
  if (isEven(n)) return C(opDiv(n, 2));
  return C(add1(opMul(3, n)));
};

export const A = (n: number, m: number): number => {
  if (isZero(n)) return add1(m);
  if (isZero(m)) return A(sub1(n), 1);
  return A(sub1(n), A(n, sub1(m)));
};

type LE<P, RT> = (f: (x: P) => RT) => (x: P) => RT;
type YRT = <P, RT>(x: P) => (x: P) => RT;

const ff = <RP extends Function, RT>(f: RP): RT => f(f);
export const Y = <P extends any, RT extends any, RP extends Function>(
  le: LE<P, RT>
): YRT => ff((f: RP) => le(x => f(f)(x)));
