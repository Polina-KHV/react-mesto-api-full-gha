import {useState} from "react";

function EnterForm(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function handleFormChange(evt) {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    })
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    const {email, password} = formValue;
    props.onFormSubmit(email, password);
    setFormValue({
      email: '',
      password: ''
    });
  };

  return(
    <>
        <main className="content">
          <form className="enter-form" name={`${props.name}`} onSubmit={handleSubmit}>
            <h2 className="enter-form__title">{props.title}</h2>
            <input type="email" className="enter-form__input" name="email" id="email-input" placeholder="Email" required autoComplete="email" value={formValue.email} onChange={handleFormChange} />
            <span className="enter-form__input-error email-input-error"></span>
            <input type="password" className="enter-form__input" name="password" id="password-input" placeholder="Пароль" required autoComplete="current-password" value={formValue.password} onChange={handleFormChange} />
            <span className="enter-form__input-error link-input-error"></span>
            <button className="enter-form__submit-button" type="submit">{props.buttonText}</button>
            {props.children}
          </form>
        </main>
    </>
  )
};

export default EnterForm;