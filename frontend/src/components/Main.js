import {useContext} from 'react';
import Card from './Card';
import { UserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  
  const currentUser = useContext(UserContext);

  return (
    <main className="content">

      {/* Profile */}
      <section className="profile">
        <div className="profile__avatar-cover">
          <img src={currentUser.avatar}  alt="Здесь должна быть ваша аватарка, но что-то пошло не так." className="profile__avatar" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      {/* Card-grid */}
      <section className="card-grid">
        <ul className="card-grid__container">
          {props.cards.map((card) =>
            <Card
              card={card}
              key={card._id}
              cardLink={card.link}
              cardName={card.name}
              cardLikes={card.likes.length}
              onCardClick={
                function(card) {props.handleCardClick(card)}
              }
              onCardLike={
                function(card) {props.handleLikeClick(card)}
              }
              onCardDelete={
                function(card) {props.handleDeleteClick(card)}
              }
            />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;