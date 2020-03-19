import _ from 'lodash';
import { SchemeConstants } from './consts';

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
