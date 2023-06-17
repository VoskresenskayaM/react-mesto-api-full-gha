import React from "react"

const BurgerButton = ({ isBurger, handleClick }) => {
    const buttonClass = `${isBurger ? 'header__burger-button' : 'header__close-button'}`
    return (
        <div>
            <button className={buttonClass} type="button" aria-label="бургер"
                onClick={handleClick} ></button>
        </div>
    )
}

export default BurgerButton