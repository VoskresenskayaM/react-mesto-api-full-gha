import React from "react";
import ok from '../../images/ok.png'
import InfoTooltip from './InfoTooltip'
import Popup from '../Popup'

const SuccesRegPopup = ({ isOpen, onClose, name, handleOut }) => {

    function handleClose() {
        handleOut('/sign-in')
        onClose()
    }

    return (
        <Popup
            isOpen={isOpen}
            onClose={handleClose}
            name={name}
            themecontainer='popup__container_theme_whithreg'
            Element={<InfoTooltip
                image={ok}
                regText='Вы успешно зарегистрировались!'
            />}>
        </Popup>
    )

}
export default SuccesRegPopup