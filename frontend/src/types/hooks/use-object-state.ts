export type ObjectStateSetter<T> = <K extends keyof T>(
  key: K,
  value: T[K],
) => void;
