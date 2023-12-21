import './style.css'

interface Props {
    icon: JSX.Element,
    heading: string
}

export default function EmptyPage({ icon, heading }: Props) {
    return (
        <div className="empty-page">
            {icon}
            <h2 className='empty-page__heading'>
                {heading}
            </h2>
        </div>
    )
}