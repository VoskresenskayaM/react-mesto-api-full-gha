import React from "react";
import SubmitButton from "./SubmitButton";

function Form({ title, name, buttonText, isFormValid, children, onSubmit, isRegForm }) {
    const formClassName = `form ${isRegForm ? 'form_theme_dark' : ''}`
    const titleClassName = `form__title  ${isRegForm ? 'form__title_theme_dark' : ''}`
    return (
        <form className={formClassName} name={name} onSubmit={onSubmit} >
            <h3 className={titleClassName}>{title}</h3>
            {children}
            <SubmitButton
                buttonText={buttonText}
                isFormValid={isFormValid}
                isRegForm={isRegForm} />
        </form>
    )
}
export default Form;

