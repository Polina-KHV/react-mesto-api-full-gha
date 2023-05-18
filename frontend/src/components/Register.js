import { NavLink } from 'react-router-dom';
import Header from './Header';
import EnterForm from './EnterForm';
import InfoTooltip from './InfoTooltip';

function Register(props) {
  return(
    <>
      <Header navLink="Войти" linkPath="/sign-in"/>
      <EnterForm
        name="registration"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onFormSubmit={props.onSignin}
      >
        <p className="enter-form__note">Уже зарегистрированы? <NavLink to="/sign-in" className="link">Войти</NavLink>
        </p>
      </EnterForm>
      <InfoTooltip
        name={props.popupData.name}
        imageType={props.popupData.imageType}
        text={props.popupData.text}
        isOpen={props.isPopupOpen}
        onClose={props.popupData.handlePopupClose}
      />
    </>
  )
};

export default Register;