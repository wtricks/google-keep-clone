import { createContext, useState } from "react";

import Alert from "../components/common/Alert";
import { DEFAULT_ALERT_TIMER } from "../constants/constants";

export const AlertContext = createContext<{ show: (val: AlertType) => void }>(null!)

interface Props {
    children: JSX.Element
}

export type AlertType = {
    message: string,
    timer?: number,
    onUndo?: () => void,
    autoClose?: boolean,
    id?: number
}

export function AlertProvider({ children }: Props) {
    const [messages, setMessages] = useState<AlertType[]>([]);

    const addAlertMessage = (obj: AlertType) => {
        setMessages([
            ...messages,
            { id: Date.now(), ...obj, timer: obj.timer || DEFAULT_ALERT_TIMER }
        ]);
    }

    const removeAlertMessage = (id: string | number) => {
        setMessages(messages.filter(message => message.id != id))
    }

    return (
        <AlertContext.Provider value={{ show: addAlertMessage }}>
            <div className="alert-container">
                {messages.map((message) => (
                    <Alert
                        onClose={removeAlertMessage}
                        message={message}
                        key={message.id}
                    />
                ))}
            </div>

            {children}
        </AlertContext.Provider>
    )
}