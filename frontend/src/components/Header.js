import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <nav className="header__menu">
        {props.children}
        <NavLink to={props.linkPath} onClick={props.onSignOut} className="header__menu-item link">{props.navLink}</NavLink>
      </nav>
    </header>
  );
};

export default Header;