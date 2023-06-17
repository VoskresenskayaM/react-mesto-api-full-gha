import React, { useEffect } from "react";
import Form from './Form'
import Popup from "./Popup";

function PopupWithForm({ name, isOpen, onClose, onSubmit, title, children, buttonText, isFormValid }) {
    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            name={name}
            themecontainer=''
            Element={ 
                <Form
                    onSubmit={onSubmit}
                    title={title}
                    name={name}
                    children={children}
                    buttonText={buttonText}
                    isFormValid={isFormValid}
                    isRegForm={false}>
                </Form>}/>
    )
}

export default PopupWithForm;
