import {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleCardNameChange(evt) {
    setCardName(evt.target.value)
  };

  function handleCardLinkChange(evt) {
    setCardLink(evt.target.value)
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  };

  useEffect(() => {
      setCardName('');
      setCardLink('');
  }, [props.isOpen]);

  return(
    <PopupWithForm
      name="place-addition"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" className="popup__input" name="place" id="place-input" placeholder="Название" minLength="2" maxLength="30" required value={cardName || ''} onChange={handleCardNameChange} />
      <span className="popup__input-error place-input-error"></span>
      <input type="url" className="popup__input" name="link" id="link-input" placeholder="Ссылка на картинку" required value={cardLink || ''} onChange={handleCardLinkChange} />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  )
};

export default AddPlacePopup