import pageRender from '../../utils/page-render';
import '../container/landing-page-container';
import AfterLogin from '../../utils/after-login';

const LandingPage = {
  async render() {
    pageRender('landing');
    return '<landing-page-container></landing-page-container>';
  },

  async afterRender() {
    AfterLogin();
  },
};

export default LandingPage;
