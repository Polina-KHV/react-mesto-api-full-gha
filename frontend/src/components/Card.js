import {useContext} from 'react';
import { UserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = useContext(UserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `card-grid__like-button ${isLiked && 'card-grid__like-button_active'}` 
  );

  return (
    <li className="card-grid__item"> 
      <img
        className="card-grid__image"
        src={`${props.cardLink}`}
        alt={`${props.cardName}`}
        onClick={
          function() {props.onCardClick(props.card)}
        }
      />
      <div className="card-grid__content">
        <h2 className="card-grid__name">{props.cardName}</h2>
        <div className="card-grid__like-content">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={
              function() {props.onCardLike(props.card)}
            }
          ></button>
          <p className="card-grid__likes-amount">{props.cardLikes}</p>
        </div>
      </div>
      {isOwn && <button
        className="card-grid__delete-button"
        type="button"
        onClick={
          function() {props.onCardDelete(props.card)}
        }
      ></button>}
    </li>
  );
}

export default Card; 