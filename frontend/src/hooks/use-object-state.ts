import { ObjectStateSetter } from "@/types/hooks/use-object-state";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = Record<string, any>;

export function useObjectState<T extends Obj>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  const set: ObjectStateSetter<T> = <K extends keyof T>(
    key: K,
    value: T[K],
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const setMany = (values: Partial<T>) => {
    setState((prev) => ({
      ...prev,
      ...values,
    }));
  };

  // const setStateRaw = (fn: (prev: T) => T) => {
  //   setState((prev) => fn(prev));
  // };

  const reset = () => {
    setState(initialState);
  };

  const clear = () => {
    const clearedState = Object.keys(state).reduce((acc, key) => {
      acc[key as keyof T] = undefined as unknown as T[keyof T];
      return acc;
    }, {} as T);
    setState(clearedState);
  };

  // const setPath = (path: string, value: unknown) => {
  //   setState((prev) => {
  //     const parts = path.split(".");
  //     const clone = structuredClone(prev); // or deep clone lib
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     let curr: any = clone;
  //     for (let i = 0; i < parts.length - 1; i++) {
  //       curr = curr[parts[i]];
  //     }
  //     curr[parts[parts.length - 1]] = value;
  //     return clone;
  //   });
  // };

  return {
    state,
    set,
    setMany,
    //   setPath,
    reset,
    clear,
  };
}
