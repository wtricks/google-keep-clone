import { useContext } from 'react'

import { AlertContext } from '../contexts/alert.context'

export default function useAlert() {
    const { show } = useContext(AlertContext)
    return show
}