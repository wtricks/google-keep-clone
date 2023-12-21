import { useState, useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/constants";

export default function useLocalStorage<T>(
    key: string,
    initialValue: T,
    expiryInMinutes?: number
): [value: T, (newValue: T) => void] {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY + key);
        if (storedValue) {
            const parsedValue = JSON.parse(storedValue);

            // Check if the stored item has expired
            if (expiryInMinutes && new Date().getTime() > parsedValue.expiry) {
                localStorage.removeItem(LOCAL_STORAGE_KEY + key);
                return initialValue;
            }
            return parsedValue.value;
        }
        return initialValue;
    })

    const setStoredValue = (newValue: T, expireInMinutes = expiryInMinutes) => {
        const expiry = expireInMinutes
            ? new Date().getTime() + expireInMinutes * 60 * 1000
            : null;

        const storedValue = JSON.stringify({ value: newValue, expiry });
        localStorage.setItem(LOCAL_STORAGE_KEY + key, storedValue);
        setValue(newValue);
    }

    useEffect(() => {
        if (expiryInMinutes == 0) {
            return () => {
                localStorage.removeItem(LOCAL_STORAGE_KEY + key);
            }
        }
    }, [expiryInMinutes, key])

    return [value, setStoredValue]
}