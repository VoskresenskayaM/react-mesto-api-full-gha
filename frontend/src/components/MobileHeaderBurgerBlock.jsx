import { CurrentUserEmailContext } from '../contexts/CurrentUserEmailContext'
import { useContext } from 'react'

function MobileHeaderBurgerBlock({ actionText, handleOut }) {
    const currentUserEmail = useContext(CurrentUserEmailContext);
    return (
        <div className='header__mobile'>
            <ul className='header__menu-mobile'>
                <li className='header__user-email'>{currentUserEmail}</li>
                <li onClick={handleOut} className='header__action'>{actionText}</li>
            </ul>
        </div >
    )
}

export default MobileHeaderBurgerBlock

