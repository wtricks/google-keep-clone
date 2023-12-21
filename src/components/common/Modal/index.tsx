import { useRef } from 'react'
import { X } from 'react-feather'

import Button from '../Button'
import './style.css'

interface Props {
    children: JSX.Element | string | JSX.Element[],
    onClose: () => void,
    heading: string,
    onSubmitButtonClick: () => void,
    submitButtonTitle: string
}

export default function Modal({ children, onClose, heading, submitButtonTitle, onSubmitButtonClick }: Props) {
    const modalRef = useRef<HTMLDivElement | null>(null)

    return (
        <div className='modal'>
            <div className="modal__back" onClick={onClose}></div>
            <div ref={modalRef} className="modal__dailog" role="dialog">
                <div className="modal__header">
                    <Button
                        value={<X size={22} />}
                        onClick={onClose}
                        type="icon"
                    />

                    <h2 className='modal__heading'>{heading}</h2>

                    <Button
                        value={submitButtonTitle}
                        onClick={onSubmitButtonClick}
                        type="primary"
                    />
                </div>
                {children}
            </div>
        </div>
    )
}