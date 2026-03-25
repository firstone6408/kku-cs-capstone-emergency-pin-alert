import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "./use-debounce";

export function useSearchField({
  query,
  currentPath,
  defaultValues,
  delay = 1000,
}: {
  query: string;
  currentPath: string;
  defaultValues?: string[];
  delay?: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get(query) || "");
  const debounced = useDebounce(search, delay);
  const isDefault =
    defaultValues && defaultValues.find((d) => d === debounced);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debounced && !isDefault) {
      params.set(query, debounced);
    } else {
      params.delete(query);
    }
    router.push(`${currentPath}?${params.toString()}`);
  }, [currentPath, debounced, query, router, searchParams, isDefault]);

  return { search, setSearch };
}
