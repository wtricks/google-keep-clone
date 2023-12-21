import { createContext, useState } from "react";

export const searchContext = createContext<{ data: [search: string, inGrid: boolean], fn: unknown }>(null!)

interface Props {
    children: JSX.Element | JSX.Element[]
}

export function SearchProvider({ children }: Props) {
    const [state, setState] = useState<[search: string, inGrid: boolean]>(['', true])
    return (
        <searchContext.Provider value={{ data: state, fn: setState }}>
            {children}
        </searchContext.Provider>
    )
}

