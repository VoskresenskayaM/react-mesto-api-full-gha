import React from "react"
import editFotoProfile from '../images/editFotoProfile.svg'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useContext } from 'react'

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardDelete,
    onCardLike }) {

    const currentUser = useContext(CurrentUserContext);

    const cardsElements = cards.map((card) => (
        <li key={card._id}>
            <Card
                card={card}
                onCardClick={onCardClick}
                deleteCardClick={onCardDelete}
                onCardLike={onCardLike} />
        </li>
    ))

    return (
        <div className="main">
            <main className="page__content">
                <section className="profile">
                    <div className="profile__image-block">
                        <div className="profile-image-contener">
                            <img className="profile__image" src={currentUser.avatar} alt="фото профиля" />
                            <div className="profile__image-overley" onClick={onEditAvatar}>
                                <img className="profile__edit-image" src={editFotoProfile} alt="изменение профиля" />
                            </div>
                        </div>
                        <div className="profile__title-block">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <p className="profile__subtitle">{currentUser.about}</p>
                        </div>
                        <button className="profile__edit" type="button" aria-label="изменить"
                            onClick={onEditProfile}></button>
                    </div>
                    <button className="profile__add-plus" type="button" aria-label="добавить"
                        onClick={onAddPlace}></button>
                </section>
                <section className="gallery" aria-label="галлерея">
                    <ul className="gallery__cards">
                        {cardsElements}
                    </ul>
                </section>
            </main>
        </div>
    )
}

export default Main;

