import encode from './encode';

const registration = () => {
  const form = document.querySelector('form#registration');
  form.addEventListener('submit', (e) => {
    console.log('registration');
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

    fetch('http://localhost:3000/api/register', {
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
