export type ArrayItem<I> = I extends readonly (infer T)[] ? T : never;
