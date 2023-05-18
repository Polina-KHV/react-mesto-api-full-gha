function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <form className="popup__content popup__form" name={`${props.name}`} onSubmit={props.onSubmit}>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button className="popup__submit-button" type="submit">{props.buttonText}</button>
          </form>
          <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        </div>
      </section>
  );
}

export default PopupWithForm;