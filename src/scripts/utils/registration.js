import Swal from 'sweetalert2';
import API_ENDPOINT from '../globals/api-endpoint';

const registration = () => {
  const form = document.querySelector('form#registration');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#fullname').value;
    const passwd = document.querySelector('#psw').value;
    const passwordConfirm = document.querySelector('#psw-repeat').value;
    const split = email.split('@');
    const username = split[0];

    if (passwd !== passwordConfirm) {
      document.querySelector('.loading-wrapper').classList.add('d-none');
      Swal.fire('Uppss', 'Pastikan konfirmasi password anda benar', 'error').then(() => {
        document.querySelector('#psw-repeat').focus();
      });
      return;
    }

    const details = {
      email,
      name,
      username,
      password: passwd,
      grant_type: 'password',
    };

    fetch(API_ENDPOINT.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(details),
    }).then((response) => {
      document.querySelector('.loading-wrapper').classList.add('d-none');
      if (response.status === 200) {
        return response.json();
      }
      return response.json();
    }).then((data) => {
      document.querySelector('.loading-wrapper').classList.add('d-none');
      if (!data.error) {
        Swal.fire('Success', 'Registrasi Berhasil', 'success').then(() => window.location.href = '/');
      } else {
        Swal.fire('Oops...', data.message, 'error');
        console.log(data);
      }
    });
  });
};

export default registration;
