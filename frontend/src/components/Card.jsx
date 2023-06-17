import React from "react";
import iconTrash from '../images/delete.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useContext } from 'react'

function Card({ card, onCardClick, deleteCardClick, onCardLike }) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `gallery__card-heart  ${isLiked && 'gallery__card-heart_active'}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        deleteCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    return (
        <div className="gallery__card">
            {isOwn && <img className="gallery__card-delete" src={iconTrash} alt="удалить" onClick={handleDeleteClick} />}
            <img className="gallery__card-image" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="gallery__card-title-block">
                <h2 className="gallery__card-title">{card.name}</h2>
                <div className="gallery__card-heart-block">
                    <button className={cardLikeButtonClassName} type="button" aria-label="лайк" onClick={handleLikeClick} ></button>
                    <p className="gallery__card-heart-count">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;

