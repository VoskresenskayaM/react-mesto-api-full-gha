import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup'
import { useState } from 'react';
import { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentUserEmailContext } from '../contexts/CurrentUserEmailContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteCardPopup from './DeleteCardPopup';
import Register from './regAndAuth/Register';
import Login from './regAndAuth/Login';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './regAndAuth/ProtectedRoute.jsx'
import *as auth from '../utils/AuthApi'
import ErrorRegPopup from './regAndAuth/ErrorRegPopup'
import SuccesRegPopup from './regAndAuth/SuccesRegPopup'
import Header from './Header'

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
    const [isSuccesRegPopupOpen, setIsSuccesRegPopupOpen] = useState(false)
    const [isErrorRegPopupOpen, setIsErrorRegPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [cards, setCards] = useState([])

    /*регистрация, авторизация*/
    const [loggenIn, setLoggenIn] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState('')
    const [isPageLoading, serIsPageLoading] = useState(false)

    const navigate = useNavigate();

    const handleLogin = () => {
        setLoggenIn(true);
    }

    useEffect(() => {
        checkToken();
    }, [])

    function checkToken() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token')
            auth.getContent(token)
                .then((res) => {
                    if (res) {
                        setLoggenIn(true)
                        serIsPageLoading(true)
                        const email = res.email
                        setCurrentUserEmail(email)
                        navigate('/', { replace: true })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    /*регистрация пользователя*/
    function registerUser(email, password) {
        auth.register(email, password)
            .then((data) => {
                if (data) {
                    setIsSuccesRegPopupOpen(true)
                }
                else {
                    setIsErrorRegPopupOpen(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    /*авторизация пользователя*/
    function loginUser(form) {
        if (!form.email || !form.password) {
            return
        }
        auth.authorize(form.email, form.password)
            .then((token) => {
                if (token) {
                    handleLogin();
                    setCurrentUserEmail(form.email)
                    serIsPageLoading(true)
                    navigate('/', { replace: true })
                }
                else setIsErrorRegPopupOpen(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        api.getAllCardWhithUser()
            .then(([cards, user]) => {
                setCards(cards)
                setCurrentUser(user)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                serIsPageLoading(false)
            })
    }, [isPageLoading])

    const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' })

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true)
        setSelectedCard(card)
    }

    function handleDeleteCardClick(card) {
        setIsDeletePopupOpen(true)
        setSelectedCard(card)
    }

    function closeAllPopups() {
        if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false)
        if (isAddPlacePopupOpen) setIsAddPlacePopupOpen(false)
        if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false)
        if (isImagePopupOpen) setIsImagePopupOpen(false)
        if (isDeletePopupOpen) setIsDeletePopupOpen(false)
        if (isSuccesRegPopupOpen) setIsSuccesRegPopupOpen(false)
        if (isErrorRegPopupOpen) setIsErrorRegPopupOpen(false)
    }

    const [isLoading, setIsLoading] = useState(false)

    function handleDeleteCard() {
        setIsLoading(true)
        api.deleteCard(selectedCard._id)
            .then(() => {
                setCards(cards => cards.filter(c => c._id !== selectedCard._id))
                closeAllPopups()
            })
            .catch((err) =>
                console.log(err))
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id)
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards(cards => cards.map(c => c._id === card._id ? newCard : c))
            })
            .catch((err) => console.log(err))
    }

    function handleAddNewCard(card) {
        setIsLoading(true)
        api.addNewCard({ item: card })
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleUpdateUser(user) {
        setIsLoading(true)
        api.editUserInfo({ item: user })
            .then((newUser) => {
                setCurrentUser(newUser)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(true)
            })
    }

    function handleUpdateAvatar(userAvatarLink) {
        setIsLoading(true)
        api.editAvatar({ item: userAvatarLink })
            .then((newAvatar) => {
                setCurrentUser(newAvatar)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    /*переход по страницам*/
    function handleOut(path) {
        navigate(path, { replace: true })
    }

    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <CurrentUserEmailContext.Provider value={currentUserEmail}>
                    <div className="page">
                        <Header handleLogin={handleLogin} />
                        <Routes>
                            <Route path='*' element={loggenIn ? <Navigate to='/' replace /> :
                                <Navigate to='/sign-in' replace />} />
                            <Route path='/sign-in' element={<Login
                                loginUser={loginUser} />} />
                            <Route path="/sign-up" element={<Register
                                registerUser={registerUser}
                                handleOut={handleOut} />} />
                            <Route path="/" element={<ProtectedRouteElement element={Main}
                                cards={cards}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardDelete={handleDeleteCardClick}
                                onCardLike={handleCardLike}
                                loggenIn={loggenIn}
                                handleLogin={handleLogin} />} />
                        </Routes>
                        <Footer />
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                            isLoading={isLoading}>
                        </EditProfilePopup>
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddNewCard={handleAddNewCard}
                            isLoading={isLoading}>
                        </AddPlacePopup>
                        <ImagePopup
                            card={selectedCard}
                            isOpen={isImagePopupOpen}
                            onClose={setIsImagePopupOpen} />
                        <DeleteCardPopup
                            isOpen={isDeletePopupOpen}
                            onClose={setIsDeletePopupOpen}
                            onDeleteCard={handleDeleteCard}
                            isLoading={isLoading}>
                        </DeleteCardPopup>
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}
                            isLoading={isLoading}>
                        </EditAvatarPopup>
                        <SuccesRegPopup
                            name='regSucces'
                            isOpen={isSuccesRegPopupOpen}
                            onClose={closeAllPopups}
                            handleOut={handleOut}>
                        </SuccesRegPopup>
                        <ErrorRegPopup
                            name='regError'
                            isOpen={isErrorRegPopupOpen}
                            onClose={closeAllPopups}>
                        </ErrorRegPopup>
                    </div>
                </CurrentUserEmailContext.Provider>
            </CurrentUserContext.Provider>
        </div >
    );
}

export default App;

