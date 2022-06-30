import Swal from 'sweetalert2';
import encode from './encode';
import API_ENDPOINT from '../globals/api-endpoint';

const registration = () => {
  const form = document.querySelector('form#registration');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('#email').value;
    const name = e.target.querySelector('#fullname').value;
    const passwd = e.target.querySelector('#psw').value;

    const details = {
      email,
      name,
      password: passwd,
      grant_type: 'password',
    };

    console.log(details);

    // const formBody = encode(details);

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
        localStorage.setItem('appFin', JSON.stringify(data.data));
        // redirect('/#/beranda');
        window.location.href = '/#/beranda';
      } else {
        swal('Oops...', `Error: ${data.error}`, 'error');
        console.log(data);
      }
    });
  });
};

export default registration;
