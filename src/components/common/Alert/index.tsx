import { useEffect, useRef } from 'react'

import { AlertType } from '../../../contexts/alert.context'
import './alert.css'
import Button from '../Button'
import { X } from 'react-feather'

interface Props {
    message: AlertType,
    onClose: (id: number) => void
}

export default function Alert({ message, onClose }: Props) {
    const initialTime = useRef(Date.now())
    const ref = useRef<HTMLDivElement | null>(null)

    const onUndoButtonClick = () => {
        (message.onUndo as (() => void))();
        onClose(message.id as number);
    }

    useEffect(() => {
        if (message.autoClose || message.autoClose == undefined) {
            const interval = setTimeout(() => {
                onClose(message.id as number)
            }, (message.timer as number) - (Date.now() - initialTime.current))

            return () => {
                clearTimeout(interval)
            }
        }
    }, [onClose, message])

    useEffect(() => {
        setTimeout(() => {
            ref.current?.classList.add('alert--show')
        }, 20)
    }, [])

    return (
        <div ref={ref} className='alert' role='alertdialog'>
            <p className='alert__message'>{message.message}</p>
            <div className="alert__ctrls">
                {
                    message.onUndo && (
                        <Button
                            value={'Undo'}
                            onClick={(onUndoButtonClick)}
                            type='secondry'
                            title="Undo Previous Action"
                            style={{ margin: '0 0.5rem' }}
                        />
                    )
                }

                <Button
                    value={<X size={22} />}
                    onClick={() => onClose(message.id as number)}
                    type='icon'
                    title="Close Alert Message"
                />
            </div>
        </div>
    )
}