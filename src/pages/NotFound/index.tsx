import { Frown } from 'react-feather'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/common/Button'
import './style.css'

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="not-found">
            <div className="not-found_inner">
                <Frown size={100} />
                <h2 className='not-found__heading'>Oops, You got a wrong page</h2>
                <p className='not-found__description'>The page you are looking for, is not exist. Go to homepage by clicking on below button</p>

                <Button value="Go to homepage" type='primary' onClick={() => navigate('/', { replace: true })} />
            </div>
        </div>
    )
}