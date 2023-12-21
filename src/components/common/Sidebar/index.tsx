import { useState } from 'react'
import { Link } from 'react-router-dom'


import { SIDEBAR_LIST_ITEMS } from '../../../constants/constants'
import './style.css'

interface Props {
    isOpened: boolean
}

export default function Sidebar({ isOpened }: Props) {
    const [items] = useState(SIDEBAR_LIST_ITEMS)

    return (
        <aside className={'sidebar' + (isOpened ? ' sidebar--close' : '')}>
            <nav className='sidebar__nav'>
                <ul className='sidebar__list'>
                    {items.map(list => (
                        <li key={list.title}>
                            <Link to={list.href} title={list.title} className={'sidebar__list-link' + (list.href == '/' ? ' active' : '')}>
                                <list.icon size={22} />
                                <span>{list.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}