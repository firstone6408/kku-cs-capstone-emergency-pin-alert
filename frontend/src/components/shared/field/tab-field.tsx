"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabData, TabFieldProps, Option } from "@/types/components/tab";
import { useState } from "react";

function normalizeData<T extends string>(data: TabData<T>): Option<T>[] {
  // string[]
  if (Array.isArray(data) && typeof data[0] === "string") {
    return (data as T[]).map((item) => ({
      value: item,
      label: item,
    }));
  }

  // object[]
  if (Array.isArray(data)) {
    return data as Option<T>[];
  }

  // record
  return Object.entries(data).map(([key, value]) => ({
    value: key as T,
    label: value,
  }));
}

export function TabField<T extends string>({
  data,
  name,
  className = "px-4",
  translateFn,
  value,
  defaultValue,
  onValueChange,
  ...props
}: TabFieldProps<T>) {
  const options = normalizeData(data);

  // detect controlled
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<T>(
    (defaultValue as T) ?? options[0]?.value,
  );

  const currentValue = (isControlled ? value : internalValue) as T;

  const handleChange = (val: string) => {
    if (!isControlled) {
      setInternalValue(val as T);
    }
    onValueChange?.(val);
  };

  return (
    <>
      {name && currentValue && (
        <input type="hidden" name={name} value={currentValue} />
      )}

      <Tabs
        value={currentValue}
        onValueChange={handleChange}
        className={className}
        {...props}
      >
        <TabsList className="w-full">
          {options.map((opt) => (
            <TabsTrigger name={name} key={opt.value} value={opt.value}>
              {translateFn ? translateFn(opt.label) : opt.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
}
