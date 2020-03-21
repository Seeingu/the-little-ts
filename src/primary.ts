import _ from 'lodash';
import { SchemeConstants } from './consts';
import { car, cdr } from './util';
import { SList, SAtom } from './types';

export enum PrimaryType {
  Atom,
  List
}

export const isAtom = (value: unknown): boolean => {
  if (_.isString(value)) {
    return true;
  }
  if (_.isNumber(value)) {
    return true;
  }
  return false;
};

export const isList = (values: unknown[]): boolean => {
  return _.every(_.flatMapDeep(values), isAtom);
};

export const isSExpression = (...values: unknown[]): boolean => {
  return isAtom(values) || isList(values);
};

export const isNull = (value: SList | SAtom | SchemeConstants): boolean => {
  if (isAtom(value)) return false;
  if (value === SchemeConstants.Nil) return true;
  return _.isEmpty(value);
};

export const isLat = (list: SList): boolean => {
  if (isNull(list)) {
    return true;
  } else if (isAtom(car(list))) {
    return isLat(cdr(list) as SList);
  } else {
    return false;
  }
};
