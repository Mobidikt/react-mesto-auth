import React from 'react';

function Register({onRegister}) {
return(<>
    <form className='register'>
        <h2>Регистрация</h2>
        <form
          className='register__form'
          noValidate
        >
          <label className="popup__field">
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
      <label className="popup__field">
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
        </form>
        <button type='submit' onClick={onRegister}>Зарегистрироваться</button> 
        <button
          type='button'
          className=''
        //   onClick={}
        >Уже зарегистрированы? Войти</button>
    </form>

</>);
}
export default Register;