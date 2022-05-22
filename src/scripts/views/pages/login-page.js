import pageRender from '../../utils/page-render';
import '../container/login-container';

const LoginPage = {
  async render() {
    pageRender('login');
    return '<login-container></login-container>';
  },

  async afterRender() {
    console.log('Halaman Login Page');
  },
};

export default LoginPage;
