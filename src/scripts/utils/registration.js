import encode from './encode';

const registration = () => {
  const form = document.querySelector('form#registration');
  form.addEventListener('submit', (e) => {
    console.log('registration');
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#fullname').value;
    const username = document.querySelector('#username').value;
    const passwd = document.querySelector('#psw').value;

    const details = {
      email,
      name,
      username,
      password: passwd,
      grant_type: 'password',
    };

    console.log(details);

    const formBody = encode(details);

    fetch('http://localhost:3000/api/register', {
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('user_id', data.user_id);
        // redirect('/#/beranda');
        window.location.href = '/#/beranda';
      } else {
        swal('Oops...', 'Username atau Password salah!', 'error');
        console.log(data);
      }
    });
  });
};

export default registration;
