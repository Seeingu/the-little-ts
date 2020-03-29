import * as cont from '../utils/cont';
import { isNull } from '../primary';
import { add1 } from '../utils/number';
import { cdr } from '../unit';
import { SList } from '../types';

test('looking', () => {
  expect(cont.looking('a', [6, 2, 4, 'a', 5, 7, 3])).toBeTruthy();
});

test('shift', () => {
  expect(
    cont.shift([
      [1, 2],
      [3, 4]
    ])
  ).toEqual([1, [2, [3, 4]]]);
});

test('weight*', () => {
  const pairs = [
    {
      pora: 'a',
      expected: 1
    },
    {
      pora: [[1, 2], 3],
      expected: 7
    },
    {
      pora: [1, [2, 3]],
      expected: 5
    }
  ];
  pairs.forEach(pair => {
    expect(cont.weightStar(pair.pora as any)).toEqual(pair.expected);
  });
});

test('Y', () => {
  const fibonacci = (fib: (n: number) => number) => {
    return (n: number): number => {
      if (n <= 2) return 1;
      return fib(n - 1) + fib(n - 2);
    };
  };
  expect(cont.Y<number, number, (x: number) => number>(fibonacci)(5)).toEqual(
    5
  );

  expect(
    cont.Y<SList, number, (x: SList) => number>(length => (list): number => {
      if (isNull(list)) return 0;
      return add1(length(cdr(list) as SList));
    })([1, 2, 3])
  ).toEqual(3);
});
