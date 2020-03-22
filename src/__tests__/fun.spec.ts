import {
  remberF,
  multiremberCo,
  multiinsertLRCo,
  evensOnlyStarCo
} from '../utils/fun';
import { isEqual } from '../utils/eq';

test('rember-f', () => {
  expect(remberF(isEqual)(1, [1, 2, 3])).toEqual([2, 3]);
});

test('multirember&co', () => {
  const result = multiremberCo(1, [1, 2, 3, 4, 1], (x, _y) => {
    return x.length;
  });
  expect(result).toEqual(3);
});

test('multiinsertLR&co', () => {
  const result = multiinsertLRCo(1, 2, 3, [2, 3, 4, 5, 2], (lat, _l, _r) => {
    return lat;
  });
  expect(result).toEqual([1, 2, 3, 1, 4, 5, 1, 2]);
});

test('evensOnly*co', () => {
  const result = evensOnlyStarCo(
    [[9, 1, 2, 8], 3, 10, [[9, 9], 7, 6], 2],
    (newList, _p, _s) => {
      return newList;
    }
  );
  expect(result).toEqual([[2, 8], 10, [[], 6], 2]);
});
