import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({onRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const submitForm = (password, email) => {
    console.log(email, password)
    onRegister(password, email);
  }
return(
        <form
          className='register'
          noValidate
        >
        <h2 className='register__title'>Регистрация</h2>
          <label className="register__field">
        <input
          name="email"
          type='email'
          placeholder="Email"
          className="register__input register__input_email"
          maxLength="40"
          minLength="2"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <span className="register__error" id="email-error" />
      </label> 
      <label className="register__field">
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          className="register__input register__input_name"
          maxLength="40"
          minLength="2"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <span className="register__error" id="password-error" />
      </label>
        <button type='submit' className='register__button' onClick={submitForm}>Зарегистрироваться</button> 
        <p className='register__text'>Уже зарегистрированы? <Link className='link' to='/sing-in'>Войти</Link></p>
        </form>);
}
export default Register;