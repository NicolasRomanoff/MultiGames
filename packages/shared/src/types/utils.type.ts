export type AllValuesOfObject<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends string
          ? `${T[K]}`
          : AllValuesOfObject<T[K]>
        : never;
    }[keyof T]
  : never;
