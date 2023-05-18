import Header from './Header';
import EnterForm from './EnterForm';
import InfoTooltip from './InfoTooltip';

function Login(props) {
  return(
    <>
      <Header navLink="Регистрация" linkPath="/sign-up"/>
      <EnterForm
        name="login"
        title="Вход"
        buttonText="Войти"
        onFormSubmit={props.onLogin}
      />
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

export default Login;