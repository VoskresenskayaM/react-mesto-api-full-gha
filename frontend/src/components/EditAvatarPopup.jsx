import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react'

function EditAvatarPopup({ isOpen, isLoading, onUpdateAvatar, onClose }) {

    const [link, setLink] = useState('')
    const [linkDirty, setLinkDirty] = useState(false)
    const [linkError, setLinkError] = useState('Это поле не может быть пустым')
    const formValid = linkError || link === '';

    useEffect(() => {
        if (!isOpen) {
            setLink('')
            setLinkError('Это поле не может быть пустым')
            setLinkDirty(false)
        }
    }, [isOpen])

    const setBlurHandler = (e) => {
        setLinkDirty(true)
    }

    const handleLinkChange = (e) => {
        setLink(e.target.value)
        if (!e.target.validity.valid) setLinkError(e.target.validationMessage)
        else setLinkError('')
    }

    const linkSpanClassName = `form__input-error avatar-input-error 
    ${linkDirty && linkError ? 'form__input-error_active' : ''}`

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            link: link
        })
    }

    return (
        <PopupWithForm
            name='new-avatar'
            title='Обновить аватар'
            buttonText={isLoading ? 'Сохранение' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isFormValid={formValid}>
            <input id="avatar-input" className="form__input  form__input_theme_avatar" name="link"
                placeholder="Ссылка на картинку" required type="url"
                value={link} onBlur={e => setBlurHandler(e)} onChange={e => handleLinkChange(e)} />
            <span className={linkSpanClassName}>{linkError}</span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup

