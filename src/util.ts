import _ from 'lodash';
import { SchemeConstants } from './consts';

export const car = (lists: unknown[] | unknown): unknown => {
  if (!_.isArray(lists)) return SchemeConstants.Nil;
  return lists[0] || SchemeConstants.Nil;
};

export const cdr = (lists: unknown[] | unknown): unknown => {
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
