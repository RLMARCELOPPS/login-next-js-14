import useSWR from "swr";

export function useLocalStorage(key: string) {
  const { data, mutate } = useSWR(key, () => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  });

  const setAuthState = <T>(value: T) => {
    // Check if the value is a string, and if so, store it directly without additional stringification
    const isString = typeof value === "string";
    const jsonValue = isString ? `${value}` : JSON.stringify(value);

    localStorage.setItem(key, jsonValue);
    mutate(jsonValue);
  };

  return [data, setAuthState] as const;
}
