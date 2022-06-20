import pageRender from '../../utils/page-render';
import '../container/registration-container';
import registration from '../../utils/registration';

const RegistrationPage = {
  async render() {
    pageRender('registration');
    return '<registration-container></registration-container>';
  },

  async afterRender() {
    registration();
    console.log('Halaman Registration Page');
  },
};

export default RegistrationPage;
