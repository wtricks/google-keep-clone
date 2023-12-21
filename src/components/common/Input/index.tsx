import { FocusEventHandler, useEffect, useRef } from "react"
import './style.css'

interface Props {
    type: string,
    placeholder?: string,
    leftIcon?: JSX.Element,
    rightIcons?: RightIcons,
    focus?: boolean,
    value: string | number,
    onChange: (v: string | number) => void,
    onFocus?: FocusEventHandler<HTMLElement>
}

type RightIcons = ({ onClick: (() => void), icon: JSX.Element })[]

export default function Input({
    value,
    onChange,
    type,
    placeholder,
    leftIcon,
    rightIcons,
    focus,
    onFocus
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (focus) {
            inputRef.current?.focus();
        }
    }, [focus])

    return (
        <div className="input-group">
            {
                leftIcon && (
                    <button className="button button--icon input-group__button">
                        {leftIcon}
                    </button>
                )
            }
            {
                type != 'textarea' ? (
                    <input
                        type={type}
                        className="input-group__input"
                        placeholder={placeholder}
                        value={value}
                        onFocus={onFocus}
                        onChange={(e) => onChange(e.target.value)}
                    />
                ) : (
                    <textarea
                        onFocus={onFocus}
                        value={value}
                        className="input-group__input input-group__textrea"
                        placeholder={placeholder}
                        onChange={(e) => onChange(e.target.value)}
                    />
                )
            }
            {
                rightIcons && rightIcons.map((icon, index) => (
                    <button key={index} className="button button--icon input-group__button" onClick={icon.onClick}>
                        {icon.icon}
                    </button>
                ))
            }
        </div>
    )
}