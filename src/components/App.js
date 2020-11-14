import React, { useState, useEffect } from "react";
import {useHistory, Switch, Route, Redirect} from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import VerificationPopup from "./VerificationPopup";
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import { ROUTES_MAP } from '../utils/routesMap';
import { register, login, getToken } from '../utils/author';
import NotFound from './NotFound';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isVerificationPopupOpen, setVerificationPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [iconPopup, setIconPopup] = useState(true);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

  useEffect(()=>{
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch((err) => console.log(err));
    }
},[history])
  useEffect(() => {
    if(loggedIn){
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(`Данные о пользователе не получены. ${err}`);
      });}
  }, [loggedIn]);
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка инициализации лайка. ${err}`);
      });
  }
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Удаление карточки не выполнено. ${err}`);
      });
  }
  const handleAddPlaceSubmit = (card) => {
    api
      .createCard(card)
      .then((res) => {
        const newCard = res;
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки. ${err}`);
      })
      .finally(() => {});
  }
  useEffect(() => {
    if(loggedIn){
    api
      .getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => {
        console.log(`Данные карточек не получены. ${err}`);
      });}
  }, [loggedIn]);

  const handleUpdateUser = (info) => {
    api
      .setUserInfo(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных пользователя. ${err}`);
      })
      .finally(() => {});
  }
  const handleUpdateAvatar = (avatar) => {
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара. ${err}`);
      })
      .finally(() => {});
  }
  const handleEsc = (e) => {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }
  const overlayClose = (e) => {
    if (e.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }
  const setEventListeners = () => {
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("click", overlayClose);
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
    setEventListeners();
  }
  const handleDeleteCardClick = (card) => {
    setVerificationPopupOpen(true);
    setSelectedCard(card);
    setEventListeners();
  }
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
    setEventListeners();
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
    setEventListeners();
  }
  const handleCardClick = (card) => {
    setImagePopupOpen(true);
    setSelectedCard(card);
    setEventListeners();
  }
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setVerificationPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
    document.removeEventListener("keydown", handleEsc);
    document.removeEventListener("click", overlayClose);
  }

  const handleLogin =(password, email) =>{
    login(password, email).then((token)=>{
      getToken(token).then((res)=>{
      setEmail(res.data.email);
    })
    .catch((err)=>{console.log(err)});
    setLoggedIn(true);
    history.push('/');
  })};
  const handleRegister =(password, email) =>{
    register(password, email)
    .then(()=>{
      setIconPopup(true);
      setInfoTooltipOpen(true);
      setEventListeners();
    })
    .catch(()=>{
      setIconPopup(false);
      setInfoTooltipOpen(true);
      setEventListeners();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          email={email}
          login={loggedIn}
        />
        <Switch>
          <Route path={ROUTES_MAP.SIGN_UP}>
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path={ROUTES_MAP.SIGN_IN}>
            <Login onLogin={handleLogin}/>
          </Route>
          <ProtectedRoute exact path={ROUTES_MAP.MAIN}
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
            />
          <Route path={ROUTES_MAP.NOT_FOUND} exact>
            <NotFound login={loggedIn} />
          </Route>
          <Redirect to={ROUTES_MAP.NOT_FOUND} />
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <VerificationPopup
          isOpen={isVerificationPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={selectedCard}
        />
        <InfoTooltip 
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          loged={iconPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
