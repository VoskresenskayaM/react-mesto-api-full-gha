import React, { useEffect } from "react";

function ImagePopup({ isOpen, onClose, card }) {

    const popupClass = `popup popup_type_image ${isOpen ? 'popup_opened' : ''}`;

    useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleEscClose)
        return () => document.removeEventListener('keydown', handleEscClose)
    }, [isOpen])

    return (
        <div className={popupClass} onClick={() => onClose()}>
            <div className="card-popup">
                <button className="popup__close-button" type="button" aria-label="закрыть"></button>
                <figure className="card-popup">
                    <img className="card-popup__image" src={card.link} alt={card.name}
                        onClick={(e => e.stopPropagation())} />
                    <figcaption>
                        <h2 className="card-popup__title">{card.name}</h2>
                    </figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;

