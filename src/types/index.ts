// Scheme types prefix with `S`

export type SList<T extends any = any> = T[];
export type SLat = any[];
export type STup = number[];
export type SAtom = number | string;
export type SSExp = SAtom | SList;
export type SSet = SLat;
export type SPair = [SSExp, SSExp];
