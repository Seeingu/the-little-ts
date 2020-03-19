import _ from 'lodash';
import { SchemeConstants } from './consts';
import { car, cdr } from './util';

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

export const isNull = (value: unknown): boolean | SchemeConstants => {
  if (isAtom(value)) return SchemeConstants.Nil;
  return _.isEmpty(value);
};

export const isLat = (list: unknown): boolean => {
  if (isNull(list)) {
    return true;
  } else if (isAtom(car(list))) {
    return isLat(cdr(list));
  } else {
    return false;
  }
};
