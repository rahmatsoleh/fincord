import swal from 'sweetalert';
import encode from './encode';

const login = () => {
  const form = document.querySelector('form#login');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#username').value;
    const passwd = document.querySelector('#password').value;
    const details = {
      username: name,
      password: passwd,
      grant_type: 'password',
    };

    const formBody = encode(details);

    fetch('http://localhost:3000/api/login', {
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
        localStorage.setItem('data', JSON.stringify(data.data));
        // redirect('/#/beranda');
        window.location.href = '/#/beranda';
      } else {
        swal('Oops...', 'Username atau Password salah!', 'error');
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
