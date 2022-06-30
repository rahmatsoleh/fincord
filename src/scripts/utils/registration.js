import Swal from 'sweetalert2';
import encode from './encode';
import API_ENDPOINT from '../globals/api-endpoint';

const registration = () => {
  const form = document.querySelector('form#registration');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#fullname').value;
    const passwd = document.querySelector('#psw').value;
    const passwordConfirm = document.querySelector('#psw-repeat').value;
    const split = email.split('@');
    const username = split[0];

    if (passwd !== passwordConfirm) {
      Swal.fire('Uppss', 'Pastikan konfirmasi password anda benar', 'error');
      return;
    }

    const details = {
      email,
      name,
      username,
      password: passwd,
      grant_type: 'password',
    };

    const formBody = encode(details);

    fetch(API_ENDPOINT.register, {
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
        Swal.fire('Success', 'Registrasi Berhasil', 'success').then(() => window.location.href = '/');
      } else {
        swal('Oops...', data.message, 'error');
      }
    });
  });
};

export default registration;
