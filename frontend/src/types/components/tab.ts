import { ComponentPropsWithoutRef } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

export type Option<T extends string = string> = {
  value: T;
  label: string;
};

export type TabData<T extends string> =
  | T[]
  | Record<string, string>
  | Option<T>[];

export interface TabFieldProps<
  T extends string,
> extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  data: TabData<T>;
  name?: string; // สำหรับ form
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translateFn?: (value: any) => any;
}
