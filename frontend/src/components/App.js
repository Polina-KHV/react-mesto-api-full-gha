import {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { UserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import ProtectedRoute from './ProtectedRoute';
import { getContent, authorize, register } from '../utils/auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';


function App() {

  // Стейты и навигация
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [infoTooltipPopupData, setInfoTooltipPopupData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Проверяем токен при загрузке сайта
  function tokenCheck() {
    setLoading(true);
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      getContent(jwt).then((res) => {
        if (res){
          setLoggedIn(true);
          setUserEmail(res.data.email);
        }
      })
      .then(() => navigate("/", {replace: true}))
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      })
      .finally(() => setLoading(false))
    } else {setLoading(false)}
  };

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  // Передаем данные успешной регистрации в попап InfoTooltip
  function setDoneRegistrationData(text) {
    setInfoTooltipPopupData({
      name: "done-registration",
      imageType: "done",
      text,
      handlePopupClose: function() {
        setIsInfoTooltipPopupOpen(false);
        navigate("/sign-in", {replace: true})
      }
    })
  };

  // Передаем данные ошибки регистрации в попап InfoTooltip
  function setFormMistakeData(text) {
    setInfoTooltipPopupData({
      name: "registration-mistake",
      imageType: "mistake",
      text,
      handlePopupClose: function() {
        setIsInfoTooltipPopupOpen(false);
      }
    });
  };

  // Обрабатываем регистрацию
  function handleRegistration(email, password) {
    register(email, password)
    .then(() => {
      setDoneRegistrationData("Вы успешно зарегистрировались!");
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
      setFormMistakeData(`Ошибка регистрации ${err.status}`);
    })
    .finally(() => setIsInfoTooltipPopupOpen(true))
  };

  // Обрабатываем вход в профиль
  function handleAuthorization(email, password) {
    if (!email || !password){
      return;
    }
    authorize(email, password)
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/", {replace: true})
      }
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
      setFormMistakeData(`Ошибка входа ${err.status}`);
    })
    .finally(() => setIsInfoTooltipPopupOpen(true))
  };

  // Обрабатываем выход из профиля
  function handleSignOut() {
    localStorage.removeItem('jwt');
    navigate("/sign-in", {replace: true})
  };
  
  // Загружаем данные пользователя
  useEffect(() => {
    if (loggedIn){
      api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  // Загружаем массив карточек
  useEffect(() => {
    if (loggedIn){
      api.getInitialCards()
      .then((data) => {
        setCards(
          data.map((item) => ({
            _id: item._id,
            link: item.link,
            name: item.name,
            likes: item.likes,
            owner: item.owner
          }))
        )
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  // Обрабатываем лайк карточек
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Обрабатываем удаление карточек
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    }
    )
    .catch((err) => {
      console.log(err);
    });
  };

  // Обрабатываем сабмит формы Place Addition
  // Добавляем карточку
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Обрабатываем сабмит формы Profile Info
  function handleUpdateUser(data) {
    api.setUserInfo(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Обрабатываем сабмит формы Avatar Update
  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Обрабатываем открывание попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  // Обрабатываем закрывание попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
  };

  // Прописываем компонент главной страницы
  const MainPage = () => {
    return (
      <UserContext.Provider value={currentUser}> 

        <Header navLink="Выйти" linkPath="/sign-in" onSignOut={handleSignOut}>
          <h3 className="header__menu-item link">{userEmail}</h3>
        </Header>

        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          handleCardClick={
            function(card){
              setSelectedCard(card);
              setIsCardPopupOpen(true);
            }
          }
          handleLikeClick={
            function(card) {handleCardLike(card)}
          }
          handleDeleteClick={
            function(card) {handleCardDelete(card)}
          }
        />

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete-confirmation"
          title="Вы уверены?"
          buttonText="Да"
        />

        <ImagePopup
          cardLink={selectedCard.link}
          cardName={selectedCard.name}
          isOpen={isCardPopupOpen}
          onClose={closeAllPopups}
        />
      </UserContext.Provider>
    )
  };

  if (loading) {
    return "Loading...";
  };

  return (
    <div className="page">
      <div className="page__container">
        <Routes>
          <Route path="/sign-up" element={<Register
            popupData={infoTooltipPopupData}
            isPopupOpen={isInfoTooltipPopupOpen}
            onSignin={handleRegistration}
          />}/>
          <Route path="/sign-in" element={<Login
            popupData={infoTooltipPopupData}
            isPopupOpen={isInfoTooltipPopupOpen}
            onLogin={handleAuthorization}
          />}/>
          <Route path="/" element={<ProtectedRoute element={MainPage} loggedIn={loggedIn} />}/>
        </Routes>
      </div>
    </div>


  );
};

export default App;