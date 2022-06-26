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
  },
};

export default RegistrationPage;
