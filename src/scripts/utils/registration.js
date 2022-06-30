import Swal from 'sweetalert2';
import encode from './encode';
import API_ENDPOINT from '../globals/api-endpoint';

const registration = () => {
  const form = document.querySelector('form#registration');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
<<<<<<< HEAD
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
=======
    const email = e.target.querySelector('#email').value;
    const name = e.target.querySelector('#fullname').value;
    const passwd = e.target.querySelector('#psw').value;
>>>>>>> c2ce452c22ee14d73778238218e8d9ca61ff7f8c

    const details = {
      email,
      name,
      password: passwd,
      grant_type: 'password',
    };

<<<<<<< HEAD
    const formBody = encode(details);
=======
    console.log(details);

    // const formBody = encode(details);
>>>>>>> c2ce452c22ee14d73778238218e8d9ca61ff7f8c

    fetch(API_ENDPOINT.register, {
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
<<<<<<< HEAD
        Swal.fire('Success', 'Registrasi Berhasil', 'success').then(() => window.location.href = '/');
      } else {
        swal('Oops...', data.message, 'error');
=======
        localStorage.setItem('appFin', JSON.stringify(data.data));
        // redirect('/#/beranda');
        window.location.href = '/#/beranda';
      } else {
        swal('Oops...', `Error: ${data.error}`, 'error');
        console.log(data);
>>>>>>> c2ce452c22ee14d73778238218e8d9ca61ff7f8c
      }
    });
  });
};

export default registration;
