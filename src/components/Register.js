import React from 'react';
import { Link } from 'react-router-dom';

function Register({onRegister}) {
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
        //   value={name || ""}
        //   onChange={handleNameChange}
          required
        />
        <span className="register__error" id="email-error" />
      </label> 
      <label className="register__field">
        <input
          name="password"
          type="password"
          placeholder="Имя"
          className="register__input register__input_name"
          maxLength="40"
          minLength="2"
          id="name"
        //   value={name || ""}
        //   onChange={handleNameChange}
          required
        />
        <span className="register__error" id="password-error" />
      </label>
        <button type='submit' className='register__button' onClick={onRegister}>Зарегистрироваться</button> 
        <p className='register__text'>Уже зарегистрированы? <Link className='link' to='/sing-in'>Войти</Link></p>
        </form>);
}
export default Register;