import React from "react";
function SubmitButton({ isFormValid, buttonText, isRegForm }) {

    const buttonClassName = `form__button ${isFormValid ?
        'form__button_inactive' : ''} ${isRegForm ?
            'form__button_theme_dark' : ''}`

    return (
        <button className={buttonClassName} type="submit" disabled={isFormValid}>{buttonText}</button>
    )
}

export default SubmitButton;

