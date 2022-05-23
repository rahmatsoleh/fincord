import pageRender from '../../utils/page-render';
import '../container/registration-container';

const RegistrationPage = {
  async render() {
    pageRender('registration');
    return '<registration-container></registration-container>';
  },

  async afterRender() {
    console.log('Halaman Registration Page');
  },
};

export default RegistrationPage;
