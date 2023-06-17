import React from "react";
import notOk from '../../images/notOk.png'
import InfoTooltip from './InfoTooltip'
import Popup from "../Popup";

const ErrorRegPopup = ({ isOpen, onClose, name }) => {

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            name={name}
            themecontainer='popup__container_theme_whithreg'
            Element={<InfoTooltip
                image={notOk}
                regText='Что-то пошло не так! Попробуйте еще раз.'
            />}>
        </Popup>
    )
}
export default ErrorRegPopup;