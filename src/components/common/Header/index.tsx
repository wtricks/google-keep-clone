import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Menu, Search, Columns, Sun, Moon, X } from 'react-feather'

import useLocalStorage from '../../../hooks/useLocalStorage'
import Button from '../Button'
import Input from '../Input'
import './header.css'
import useSearch from '../../../hooks/useSearch'

interface Props {
    onMenuClick: () => void
}

export default function Header({ onMenuClick }: Props) {
    const { data, fn } = useSearch();
    const [search, setSearch] = useState('')
    const [inCloumn, setInCloumn] = useState(true)
    const [searchFocus, setSearchFocus] = useState(false)

    const [theme, setTheme] = useLocalStorage('theme', 'light')
    const onSearchSubmit = (event: FormEvent) => {
        event.preventDefault();

        // @ts-expect-error TODO: type issue
        fn([search, data[1]])
    }

    const onGridClick = () => {
        // @ts-expect-error TODO: type issue
        fn([data[0], !inCloumn])
        setInCloumn(!inCloumn)
    }

    const onSearchButtonClick = () => {
        setSearchFocus(!searchFocus)
        setSearch('')
    }

    useEffect(() => {
        document.body.classList.add(theme);
        document.body.classList.remove(theme == 'light' ? 'dark' : 'light');
    }, [theme])

    return (
        <header className={'header' + (searchFocus ? ' header--search-focus' : '')}>
            <div className="header__inner">
                <Button
                    type='icon'
                    value={<Menu />}
                    onClick={onMenuClick}
                    title="Main menu"
                />

                <Link
                    to="/"
                    className='header__logo'
                >
                    <img src="./logo.png" alt="Google Keep CLone" />
                    <span>Keep</span>

                </Link>

                <form action="/search" className='header__form' onSubmit={onSearchSubmit} method="get">
                    <Input
                        onChange={setSearch as (v: string | number) => void}
                        value={search}
                        type='text'
                        placeholder='Search'
                        leftIcon={<Search size={22} />}
                        rightIcons={search ? [{
                            icon: <X size={22} />,
                            onClick: () => setSearch('')
                        }] : undefined}
                    />
                </form>

                <Button
                    type='icon'
                    value={searchFocus ? <X size={22} /> : <Search size={22} />}
                    onClick={onSearchButtonClick}
                    className='header__buttons header__search-button'
                />

                <Button
                    type='icon'
                    value={!inCloumn ? <Columns size={22} /> : <Grid size={22} />}
                    onClick={onGridClick}
                    className='header__buttons'
                />

                <Button
                    type='icon'
                    value={theme == 'light' ? <Sun size={22} /> : <Moon size={22} />}
                    onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
                    className='header__buttons'
                />
            </div>
        </header>
    )
}