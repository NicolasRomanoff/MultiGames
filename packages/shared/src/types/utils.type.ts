export type DeepValues<T> = T extends string
  ? T
  : T extends object
    ? DeepValues<T[keyof T]>
    : never;
