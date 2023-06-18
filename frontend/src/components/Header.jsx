import { useLocation, useNavigate } from "react-router-dom";
import logo from '../images/logo.svg'
import BurgerButton from "./BurgerButton"
import MobileHeaderBurgerBlock from './MobileHeaderBurgerBlock'
import { CurrentUserEmailContext } from '../contexts/CurrentUserEmailContext'
import { useContext, useState } from 'react'

const Header = ({ handleLogin }) => {

    const navigate = useNavigate();

    let location = useLocation();

    const currentUserEmail = useContext(CurrentUserEmailContext);

    const [isBurger, setIsBurger] = useState(true)

    function handleBurgerButtonClick() {
        setIsBurger(!isBurger)
    }

    function handleOut(path) {
        navigate(path, { replace: true })
    }

    function handleUserOut() {
        localStorage.removeItem('token')
        handleOut('/sign-in')
        handleLogin()
        handleBurgerButtonClick()
    }

    switch (location.pathname) {
        case '/sign-in':
            return (
                <header className="header">
                    <img className="logo" src={logo} alt="логотип" />
                    <p onClick={() => handleOut('/sign-up')} className='header__action-notreg'>Регистрация</p>
                </header>
            )
        case '/sign-up':
            return (
                <header className="header">
                    <img className="logo" src={logo} alt="логотип" />
                    <p onClick={() => handleOut('/sign-in')} className='header__action-notreg'>Вход</p>
                </header>
            )
        case '/':
            return (
                <div>
                    {!isBurger && <MobileHeaderBurgerBlock
                        actionText='Выйти'
                        handleOut={handleUserOut}
                    />}
                    <header className="header">
                        <img className="logo" src={logo} alt="логотип" />
                        <ul className='header__menu'>
                            <li className='header__user-email'>{currentUserEmail}</li>
                            <li onClick={handleUserOut} className='header__action'>Выйти</li>
                        </ul>
                    </header>
                    <BurgerButton
                        isBurger={isBurger}
                        handleClick={handleBurgerButtonClick}
                    />
                </div>
            )
            default:
                break
    }
}

export default Header

