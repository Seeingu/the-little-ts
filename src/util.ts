import _ from 'lodash';
import { SchemeConstants } from './consts';
import { isNull } from './primary';

export const car = (lists: unknown): unknown => {
  if (!_.isArray(lists)) return SchemeConstants.Nil;
  return lists[0] || SchemeConstants.Nil;
};

export const cdr = (lists: unknown): unknown => {
  if (!_.isArray(lists)) return SchemeConstants.Nil;
  if (lists.length === 0) return SchemeConstants.Nil;
  return lists.slice(1);
};

export const cons = (atom: unknown, lists: unknown[] | unknown): unknown => {
  if (!_.isArray(lists)) return SchemeConstants.Nil;
  return [atom, ...lists];
};

export const isEq = (v1: unknown, v2: unknown): boolean => {
  if (_.isNumber(v1) || _.isNumber(v2)) return false;
  if (_.isArray(v1) || _.isArray(v2)) return false;
  return _.isEqual(v1, v2);
};

export const or = (v1: boolean, v2: boolean): boolean => {
  return v1 || v2;
};

export const isMember = (atom: unknown, list: unknown): boolean => {
  if (isNull(list)) return false;
  else if (isEq(atom, car(list))) {
    return true;
  } else {
    return isMember(atom, cdr(list));
  }
};
