import _ from 'lodash';
import { isNull } from '../primary';
import { cdr, car, cons, or } from '../unit';
import { STup } from '../types';

/** @unit */
export const add1 = (num: number): number => {
  return num + 1;
};

/**
 * @unit
 * @param num negative number return 0
 */
export const sub1 = (num: number): number => {
  if (num <= 0) return 0;
  return num - 1;
};

export class UnsupportedError extends Error {}

/** @unit */
export const isZero = (num: number): boolean => {
  return num === 0;
};

/**
 * TODO: ignore negative numbers
 */
export const opAdd = (num1: number, num2: number): number => {
  if (num1 < 0 || num2 < 0)
    throw new UnsupportedError(
      `num1 ${num1} or num2 ${num2} should bigger or equal than 0`
    );
  if (isZero(num1)) return num2;
  return opAdd(sub1(num1), add1(num2));
};

export const opTupAdd = (tup1: STup, tup2: STup): STup => {
  if (isNull(tup1)) {
    return tup2;
  } else if (isNull(tup2)) {
    return tup1;
  }
  return cons(
    opAdd(car(tup1) as number, car(tup2) as number),
    opTupAdd(cdr(tup1) as STup, cdr(tup2) as STup)
  );
};

/**
 * TODO: ignore negative numbers
 */
export const opSub = (num1: number, num2: number): number => {
  if (num1 < 0 || num2 < 0)
    throw new UnsupportedError(
      `num1 ${num1} or num2 ${num2} should bigger or equal than 0`
    );
  if (isZero(num2)) return num1;
  return opSub(sub1(num1), sub1(num2));
};

export const opMul = (num1: number, num2: number): number => {
  if (num1 < 0 || num2 < 0)
    throw new UnsupportedError(
      `num1 ${num1} or num2 ${num2} should bigger or equal than 0`
    );
  if (isZero(num1)) return 0;
  return opAdd(num2, opMul(sub1(num1), num2));
};

/**
 * isTup should always return true when type is correct
 * @param _0
 */
export const isTup = (_0: STup): boolean => {
  return true;
};

export const addTup = (tup: STup): number => {
  if (isNull(tup)) return 0;
  return opAdd(car(tup) as number, addTup(cdr(tup) as STup));
};

export const opGreater = (num1: number, num2: number): boolean => {
  if (num1 < 0 || num2 < 0) {
    throw new UnsupportedError(
      `num1 ${num1} or num2 ${num2} should bigger or equal than 0`
    );
  }
  if (isZero(num1)) {
    return false;
  }
  if (isZero(num2)) {
    return true;
  }
  return opGreater(sub1(num1), sub1(num2));
};

export const opSmaller = (num1: number, num2: number): boolean => {
  if (num1 < 0 || num2 < 0) {
    throw new UnsupportedError(
      `num1 ${num1} or num2 ${num2} should bigger or equal than 0`
    );
  }
  if (isZero(num2)) {
    return false;
  }
  if (isZero(num1)) {
    return true;
  }

  return opSmaller(sub1(num1), sub1(num2));
};

export const opEq = (num1: number, num2: number): boolean => {
  if (num1 < 0 || num2 < 0) {
    throw new UnsupportedError(
      `num1 ${num1} or num2 ${num2} should bigger or equal than 0`
    );
  }
  if (or(opGreater(num1, num2), opSmaller(num1, num2))) {
    return false;
  }
  return true;
};

export const opExp = (num1: number, num2: number): number => {
  if (num1 < 0 || num2 < 0)
    throw new UnsupportedError(
      `num1 ${num1} or num2 ${num2} should bigger or equal than 0`
    );
  if (isZero(num2)) return 1;
  return opMul(num1, opExp(num1, sub1(num2)));
};

export const opDiv = (num1: number, num2: number): number => {
  if (num1 < 0 || num2 < 0)
    throw new UnsupportedError(
      `num1 ${num1} or num2 ${num2} should bigger or equal than 0`
    );
  if (opSmaller(num1, num2)) {
    return 0;
  }
  return add1(opDiv(opSub(num1, num2), num2));
};

export const isNumber = (num: any): num is number => {
  return _.isNumber(num);
};

export const isOne = (num: number): boolean => {
  return opEq(num, 1);
};
