import React from 'react'

function DeleteCardPopup({ isOpen, isLoading, onClose, onDeleteCard }) {

    const popupClass = `popup popup_type_delete-card ${isOpen ? 'popup_opened' : ''}`;

    return (
        <div>
            <div className={popupClass} onClick={() => onClose(false)}>
                <div className="popup__container popup__container_theme_whithsubmit">
                    <button className="popup__close-button" type="button" aria-label="закрыть">
                    </button>
                    <div className="popup__question-block">
                        <h3 className="popup__title">Вы уверены?</h3>
                        <button className="popup__button" type="button" onClick={onDeleteCard} >
                            {isLoading ? 'Удаление' : 'Да'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteCardPopup;

