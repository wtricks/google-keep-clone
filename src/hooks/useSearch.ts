import { useContext } from 'react'

import { searchContext } from '../contexts/search.context'

export default function useSearch() {
    return useContext(searchContext)
}