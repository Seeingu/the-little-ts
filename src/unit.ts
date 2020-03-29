import _ from 'lodash';
import { SList, SAtom } from './types';
import { SchemeConstants } from './consts';
import { ArrayItem } from './types/typeFn';

/** @unit */
export const car = <T extends SList>(
  lists: T
): SchemeConstants | ArrayItem<T> => {
  return _.isNil(lists[0]) ? SchemeConstants.Nil : lists[0];
};

/** @unit */
export const cdr = <T extends SList>(lists: T): SchemeConstants | SList => {
  if (!_.isArray(lists)) return SchemeConstants.Nil;
  if (lists.length === 0) return SchemeConstants.Nil;
  return lists.slice(1);
};

/** @unit */
export const cons = (atom: SAtom | SList, lists: SList): SList => {
  return [atom, ...lists];
};

/** @unit */
export const isEq = (v1: SAtom | SList, v2: SAtom | SList): boolean => {
  if (_.isNumber(v1) || _.isNumber(v2)) return false;
  if (_.isArray(v1) || _.isArray(v2)) return false;
  return _.isEqual(v1, v2);
};

/** @unit */
export const or = (v1: boolean, v2: boolean): boolean => {
  return v1 || v2;
};
/** @unit */
export const and = (
  v1: boolean | SchemeConstants,
  v2: boolean | SchemeConstants
): boolean => {
  if (v1 === SchemeConstants.Nil) {
    return v2 === SchemeConstants.Nil;
  }
  return (v1 as boolean) && (v2 as boolean);
};
