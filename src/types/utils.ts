// eslint-disable-next-line no-unused-vars
export type Overwrite<T, U extends { [Key in keyof T]?: unknown }> = Omit<
  T,
  keyof U
> & U;