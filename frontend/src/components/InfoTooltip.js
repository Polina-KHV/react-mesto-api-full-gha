function InfoTooltip(props) {
  return(
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <div className="popup__tooltip-content">
            <div className={`popup__tooltip-image popup__tooltip-image_type_${props.imageType}`}/>
            <h2 className="popup__tooltip-title">{props.text}</h2>
          </div>
          <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        </div>
      </section>
  )
};

export default InfoTooltip;