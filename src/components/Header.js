import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/header/logo.svg';
function Header({loged}) {
  const { path } = useLocation();
  const linkPath = `${path === '/sing-in' ? '/sing-up' : '/sing-in'}`;
  const linkText = `${path === '/sing-in' ? 'Регистрация' : 'Войти'}`;
  return (
    <header className='header'>
      <img className='header__logo' src={headerLogo} alt='Место Россия' />
      {loged? (
        <>
        </>
      ): ( <Link className='header__button' to={linkPath}>{linkText}</Link> )

      }
    </header>
  );
}
export default Header;
