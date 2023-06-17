import React from "react";
import { useEffect } from "react";

const Popup = ({ isOpen, onClose, name, themecontainer, Element }) => {

    useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleEscClose)
        return () => document.removeEventListener('keydown', onClose)
    }, [isOpen])

    const popupClass = `popup  popup_type_${name} ${isOpen ? 'popup_opened' : ''}`;
    const containerClass = `popup__container ${themecontainer}`
    return (
        <div className={popupClass} onClick={onClose} >
            <div className={containerClass} onClick={(e => e.stopPropagation())}>
                <button className="popup__close-button" type="button" aria-label="закрыть"
                    onClick={onClose}></button>
                {Element}
            </div>
        </div >
    )
}

export default Popup