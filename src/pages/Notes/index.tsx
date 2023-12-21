import { Award } from 'react-feather';

import NoteInput, { Note } from '../../components/pages/NoteInput'
import EmptyPage from '../../components/common/EmptyPage'
import './style.css'
import useLocalStorage from '../../hooks/useLocalStorage';
import { useMemo, useState } from 'react';
import useSearch from '../../hooks/useSearch';

export default function Home() {
    const [notes, setNotes] = useLocalStorage<Note[]>('notes', [])
    const [editId, setEditId] = useState(-1)
    const { data } = useSearch()

    const filteredNotes = useMemo(() => {
        const reg = new RegExp(data[0], 'im')
        return notes.filter(note => reg.test(note.title) || reg.test(note.content))
    }, [data, notes])

    const onCreateNewPost = (index: number, note: Note) => {
        if (index == -1) {
            if (note.content || note.title) {
                setNotes([note, ...notes])
            }
        } else {
            notes[index] = note;
            setEditId(-1)
            setNotes([...notes])
        }
    }

    const removeNote = (index: number) => {
        setNotes(notes.filter((_, i) => i != index))
    }

    return (
        <div className={"home max-600" + (data[1] ? ' grid' : '')}>
            <NoteInput
                note={{
                    background: '',
                    content: '',
                    createdAt: 0,
                    isArchieve: false,
                    inBin: -1,
                    isPinned: 0,
                    label: '',
                    reminder: 0,
                    title: ''
                }}
                onEdit={onCreateNewPost}
                inEditMode={true}
                isCreater={true}
                noteIndex={-1}

            />

            <div className="note-container">
                {filteredNotes.map((note, index) => (
                    <NoteInput
                        note={note}
                        onEdit={onCreateNewPost}
                        inEditMode={editId == index}
                        isCreater={false}
                        key={note.createdAt}
                        onClick={() => {
                            setEditId(index)
                        }}
                        noteIndex={index}
                        inBin={false}
                        onRemoveOrRestore={() => removeNote(index)}
                    />
                ))}
            </div>

            {notes.length == 0 && (
                <EmptyPage
                    icon={<Award size={100} />}
                    heading="Notes you add apears here"
                />
            )}
        </div>
    )
}