import { SList, SSExp, SPair } from '../types';
import { isAtom, isNull } from '../primary';
import { firsts } from '../util';
import { isSet } from './set';
import { cdr, car, cons } from '../unit';

// TODO: Guard

export const isAPair = (s: SSExp): boolean => {
  if (isAtom(s)) return false;
  if (isNull(s)) return false;
  if (isNull(cdr(s as SList))) return false;
  if (isNull(cdr(cdr(s as SList) as SList))) return true;
  return false;
};

export const first = (pair: SPair): SSExp => {
  return car(pair);
};

export const second = (pair: SPair): SSExp => {
  return car(cdr(pair) as SList);
};

export const build = (s1: SSExp, s2: SSExp): SPair => {
  return cons(s1, cons(s2, [])) as SPair;
};

export const revpair = (pair: SPair): SPair => {
  return build(second(pair), first(pair));
};

export const revrel = (rel: SList): SList => {
  if (isNull(rel)) return [];
  return cons(revpair(car(rel)), revrel(cdr(rel) as SList));
};

export const isFun = (rel: SList): boolean => {
  return isSet(firsts(rel));
};

export const isFullfun = (fun: SList): boolean => {
  return isFun(revrel(fun));
};
