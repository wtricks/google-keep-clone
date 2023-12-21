import { useEffect, useRef, useState } from 'react'
import { List, Image, Flag, Archive, Tag, Command, Trash2, Code, RefreshCw, Edit2 } from 'react-feather'

import { COLOR_CODES } from '../../../constants/constants'
import useListener from '../../../hooks/useListener'
import useAlert from '../../../hooks/useAlert'
import Input from '../../common/Input'
import Button from '../../common/Button'
import './style.css'

export type Note = {
    title: string,
    content: string,
    background: string,
    inBin: number,
    isArchieve: boolean,
    createdAt: number,
    reminder: number,
    isPinned: number,
    label: string,
}

interface Props {
    onRemoveOrRestore?: () => void | null,
    note: Note,
    inEditMode: boolean,
    onEdit?: (index: number, note: Note) => void,
    onClick?: () => void,
    isCreater: boolean,
    noteIndex: number,
    inBin?: boolean
}

export default function NoteInput({ onRemoveOrRestore, onClick, note, inBin, onEdit, inEditMode, isCreater, noteIndex }: Props) {
    const firstRender = useRef(true)
    const alert = useAlert();
    const elementRef = useRef<HTMLDivElement>(null!);
    const [inFocus, setInFocus] = useState(false)

    const [title, setTitle] = useState<string | number>(note.title);
    const [content, setContent] = useState<string | number>(note.content);

    // @ts-expect-error TODO: Solve `any` key type issue.
    const [color, setColor] = useState(COLOR_CODES[note.background]);
    const [archieve, setArchive] = useState(!!note.isArchieve);
    const [pin, setPin] = useState(note.isPinned as number);

    const [colorPlate, showColorPlate] = useState(false);

    const onAction = (action: string) => {
        // We can do lot more thing based on action
        console.log("Action:", action)

        setInFocus(true)
    }

    // @ts-expect-error Todo: handle 'event' type here
    useListener(window, 'click', (event: MouseEvent) => {
        if (!elementRef.current.contains(event.target as Node)) {
            onCloseNoteForm();
        }
    })

    const pinCurrentNote = () => {
        setPin(pin == 0 ? Date.now() : 0);
        alert({ message: 'This note\'ll be ' + (pin ? 'unpinned.' : 'pinned.'), timer: 2000 })
    }

    const onCloseNoteForm = () => {
        if (!inFocus) {
            return
        }

        setInFocus(false);
        showColorPlate(false)

        onEdit?.(noteIndex, {
            title: title as string,
            content: content as string,
            background: color,
            inBin: note.inBin || 0,
            isArchieve: archieve,
            createdAt: note.createdAt || Date.now(),
            reminder: -1,
            isPinned: pin,
            label: note.label
        })

        if (inEditMode && isCreater) {
            setColor('')
            setTitle('')
            setContent('')
        }
    }

    const addLabel = () => {
        /**
         * Add label
         */
    }

    useEffect(() => {
        setTitle(note.title)
        setContent(note.content)
        setColor(note.background)
        setArchive(note.isArchieve)
        setPin(note.isPinned)
    }, [note.background, note.content, note.isArchieve, note.isPinned, note.title])

    useEffect(() => {
        if (inEditMode && firstRender.current == false) {
            onAction('')
        }

        firstRender.current = false;
    }, [inEditMode])

    const isPost = noteIndex != -1 && !inEditMode;

    return (
        <div ref={elementRef} className={'note-input ' + (isPost ? ' note' : '') + (isCreater ? ' creater' : '')}>
            {/* @ts-expect-error TODO: Resolve `any` type issue here */}
            <div className="note-input__inner" style={{ backgroundColor: COLOR_CODES[color] }}>

                {!isPost ? (
                    <Input
                        value={title}
                        onChange={setTitle}
                        type='text'
                        placeholder={inFocus ? 'Title' : 'Take a note...'}
                        focus={inFocus}
                        onFocus={() => onAction('')}
                        rightIcons={!isCreater ? undefined : !inFocus ? [
                            {
                                icon: <List />,
                                onClick: () => onAction('list')
                            },
                            {
                                icon: <Image />,
                                onClick: () => onAction('image')
                            }
                        ] : [{ icon: <Flag strokeWidth={pin ? 4 : 2} size={22} />, onClick: pinCurrentNote }]}
                    />
                ) : (
                    <div className="note-input__top">
                        <h4>{title}</h4>
                        <Button
                            value={<Flag strokeWidth={pin ? 4 : 2} size={22} />}
                            onClick={pinCurrentNote}
                            type="icon"
                            title="Archive note"
                        />
                    </div>
                )}

                {(inFocus || isPost || note.inBin != -1) && (
                    <>
                        {!inEditMode ? (
                            <p className="note-input__content">{content}</p>
                        ) : (
                            <Input
                                onChange={setContent}
                                value={content}
                                type="textarea"
                                placeholder='Take a note...'
                            />

                        )}
                        <div className="note-input__footer">
                            {colorPlate && (
                                <div className="note-input__color-plate">
                                    <Button
                                        title="No Color"
                                        type="icon"
                                        value={<Code size={22} />}
                                        onClick={() => setColor('')}
                                        className={!color ? 'button--selected' : ''}
                                    />
                                    {Object.keys(COLOR_CODES).map((name) => (
                                        <Button
                                            title={name + ' color'}
                                            type="icon"
                                            value={''}
                                            onClick={() => setColor(name)}
                                            key={name}
                                            className={name == color ? 'button--selected' : ''}
                                            // @ts-expect-error TODO: Resolve `any` type issue here
                                            style={{ backgroundColor: COLOR_CODES[name] }}
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="note-input__buttons">
                                <Button
                                    value={<Archive size={22} strokeWidth={archieve ? 4 : 2} />}
                                    onClick={() => setArchive(!archieve)}
                                    type="icon"
                                    title="Archive note"
                                />
                                <Button
                                    value={<Command size={22} />}
                                    onClick={() => showColorPlate(!colorPlate)}
                                    type="icon"
                                    title="Add background color"
                                />
                                <Button
                                    value={<Tag size={22} />}
                                    onClick={addLabel}
                                    type="icon"
                                    title="Add label"
                                />

                                {onRemoveOrRestore && (
                                    <Button
                                        value={inBin ? <RefreshCw size={22} /> : <Trash2 size={22} />}
                                        onClick={onRemoveOrRestore}
                                        type="icon"
                                        title="Remove note"
                                    />
                                )}

                                {!inEditMode ? (
                                    <Button
                                        value={<Edit2 size={22} />}
                                        onClick={onClick}
                                        type="icon"
                                        title="Edit Note"
                                        style={{ marginLeft: 'auto' }}
                                        className='edit--button'
                                    />
                                ) : (
                                    <Button
                                        value={'Close'}
                                        onClick={onCloseNoteForm}
                                        type="secondry"
                                        title="Close and create note"
                                        style={{ marginLeft: 'auto' }}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}