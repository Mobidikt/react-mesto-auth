import {baseUrl} from './constants.js';

export const register = (password, email) => fetch(`${baseUrl}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((res) => {
    if (!res.ok) {
      return res.json()
        .then((err) => {
          console.log(err);
        });
    }
    return res.json();
  });
export const login = (password, email) => fetch(`${baseUrl}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then((res) => {
    if (res.status === 400) {
      console.log("не передано одно из полей"); //Заменить на ответ для пользователя
    } 
    if (res.status === 401){
      console.log("пользователь с email не найден"); //Заменить на ответ для пользователя
    }
    return res.json();
  }).then((data) => {
     if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data.token;
    }
});

export const getToken = (token) => fetch(`${baseUrl}/users/me`,{
    method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
      },
}).then ((res)=>{
    if(!res.ok) {
        return res.json()
            .then((err) =>{
                console.log(err);
            });
    }
    return res.json();
}).then((data)=>data);