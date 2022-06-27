import swal from 'sweetalert';
import encode from './encode';

const login = () => {
  const form = document.querySelector('form#login');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    const details = {
      email,
      password,
      // grant_type: 'password',
    };
    console.log(details);

    // const formBody = encode(details);

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(details),
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
