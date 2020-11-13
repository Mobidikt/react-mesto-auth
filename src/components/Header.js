import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import headerLogo from '../images/header/logo.svg';
import { ROUTES_MAP } from '../utils/routesMap';
function Header() {
  return <Switch>
    <Route path='/404' exact/>
    <Route path='*'>
      <header className='header'>
        <img className='header__logo' src={headerLogo} alt='Место Россия' />
      <Switch>
        <Route path='/sign-up'>
          <Link className='header__button' to={ROUTES_MAP.SIGN_IN}>Войти</Link>
        </Route>
        <Route path='/sign-in'>
          <Link className='header__button' to={ROUTES_MAP.SIGN_UP}>Регистрация</Link>
        </Route>
      </Switch>
      </header>
    </Route>
  </Switch>
}
export default Header;
