import { useEffect } from 'react'

type EventMap<T> = T extends HTMLElement
    ? keyof HTMLElementEventMap
    : T extends Window
    ? keyof WindowEventMap
    : keyof DocumentEventMap;

export type EventCallback<T extends Event = Event> = (event: T) => void

export type HandlerType = HTMLElementEventMap[keyof HTMLElementEventMap] | Event

export default function useListener<T extends Window | HTMLElement>(
    element: T | { current: T },
    event: EventMap<T>,
    handler: EventCallback<HandlerType>
) {
    useEffect(() => {
        const elem = ('current' in element ? element.current : element) as T;

        elem.addEventListener(event, handler);
        return () => {
            elem.removeEventListener(event, handler)
        }
    }, [element, event, handler])
}