import Swal from 'sweetalert2';
import API_ENDPOINT from '../globals/api-endpoint';

const login = () => {
  const form = document.querySelector('form#login');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    const details = {
      email,
      password,
    };

    document.querySelector('.loading-wrapper').classList.remove('d-none');
    fetch(API_ENDPOINT.login, {
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
      document.querySelector('.loading-wrapper').classList.add('d-none');
      if (!data.error) {
        const dataForLocal = {
          id: data.data.id,
          token: data.data.token,
        };
        localStorage.setItem('appFin', JSON.stringify(dataForLocal));
        window.location.href = '/';
      } else {
        Swal.fire('Oops...', data.message, 'error');
        console.log(data);
      }
    }).catch((err) => {
      document.querySelector('.loading-wrapper').classList.add('d-none');
      Swal.fire('Oops...', 'Terjadi kesalahan pada server', 'error');
    });

    document.querySelector('.loading-wrapper').classList.add('d-none');
  });
};

export default login;
