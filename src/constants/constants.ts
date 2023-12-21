import { Award, Bell, Edit2, Archive, Trash } from 'react-feather'

/**
 * Default time in ms for Alert.
 */
export const DEFAULT_ALERT_TIMER = 4000;

/**
 * Prefix for local storage keys
 */
export const LOCAL_STORAGE_KEY = 'gl_'

/**
 * Sidebar icons
 */
export type SIDEBAR_LIST_ITEMS_TYPE = {
    title: string;
    icon: JSX.Element;
    href: string;
}

export const SIDEBAR_LIST_ITEMS = [
    {
        title: 'Notes',
        icon: Award,
        href: '/'
    },
    {
        title: 'Reminders',
        icon: Bell,
        href: '/reminder'
    },
    {
        title: 'Edit lables',
        icon: Edit2,
        href: '/edit-labels'
    },
    {
        title: 'Archive',
        icon: Archive,
        href: '/archive'
    },
    {
        title: 'Bin',
        icon: Trash,
        href: '/bin'
    }
]

export const COLOR_CODES = {
    1: '#faafa8',
    2: '#f39f76',
    3: '#fff8b8',
    4: '#e2f6d3',
    5: '#b4ddd3',
    6: '#d4e4ed',
    7: '#aeccdc',
    8: '#d3bfdb',
    9: '#e9e3d4',
    10: '#efeff1',
}