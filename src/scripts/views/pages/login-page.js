import pageRender from '../../utils/page-render';
import '../container/login-container';
import login from '../../utils/login';

const LoginPage = {
  async render() {
    pageRender('login');
    return '<login-container></login-container>';
  },

  async afterRender() {
    console.log('Halaman Login Page');
    login();
  },
};

export default LoginPage;
