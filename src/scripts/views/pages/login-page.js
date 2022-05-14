import pageRender from '../../utils/page-render';

const LoginPage = {
  async render() {
    pageRender('login');
    return '<h1>Halaman Login Page</h1>';
  },

  async afterRender() {
    console.log('Halaman Login Page');
  },
};

export default LoginPage;
