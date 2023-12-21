import { CSSProperties } from 'react'
import './style.css'

interface Props {
    title?: string,
    value: JSX.Element | string,
    onClick?: () => void,
    type: 'primary' | 'secondry' | 'icon',
    style?: CSSProperties,
    className?: string
}

export default function Button({ style, title, value, type, onClick, className }: Props) {
    return (
        <button
            className={"button button--" + type + (className ? (' ' + className) : '')}
            title={title}
            onClick={onClick}
            type={onClick ? "button" : 'submit'}
            style={style}
        >
            {value}
        </button>
    )
}