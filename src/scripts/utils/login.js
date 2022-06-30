import swal from 'sweetalert';
import encode from './encode';
import API_ENDPOINT from '../globals/api-endpoint';

const login = () => {
  const form = document.querySelector('form#login');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const details = {
      email,
      password,
      grant_type: 'password',
    };

    const formBody = encode(details);

    fetch(API_ENDPOINT.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return response.json();
    }).then((data) => {
      if (!data.error) {
        const dataForLocal = {
          id: data.data.id,
          token: data.data.token,
        };
        localStorage.setItem('appFin', JSON.stringify(dataForLocal));
        // redirect('/#/beranda');
        window.location.href = '/';
      } else {
        swal('Oops...', 'Email atau Password salah!', 'error');
        console.log(data);
      }
    }).catch((err) => {
      console.log(err);
    });

    // XMLHttpRequest.prototype.sendAsJson = function (data) {
    //   this.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //   this.send(data);
    // };
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost:3000/api/login');
    // xhr.sendAsJson(data);
  });
};

export default login;
