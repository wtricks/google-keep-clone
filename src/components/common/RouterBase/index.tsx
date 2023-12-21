import { useCallback, useState } from "react";
import { Outlet } from 'react-router-dom'

import useListener, { HandlerType } from "../../../hooks/useListener";

import Header from "../Header";
import Sidebar from "../Sidebar";
import { SearchProvider } from "../../../contexts/search.context";

export default function RouterBase() {
    const [sidebar, setSidebar] = useState(window.innerWidth < 900)

    const onMenuClick = useCallback(() => {
        setSidebar(!sidebar)
    }, [sidebar])

    useListener(window, 'resize', (event: HandlerType) => {
        // @ts-expect-error TODO: We need to change `event` type 
        setSidebar(event.target.innerWidth < 900);
    })

    return (
        <SearchProvider>
            <Header onMenuClick={onMenuClick} />
            <main className="main">
                <Sidebar isOpened={sidebar} />
                <div className="main__content">
                    <Outlet />
                </div>
            </main>
        </SearchProvider>
    )
}