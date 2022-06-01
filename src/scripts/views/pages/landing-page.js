import pageRender from '../../utils/page-render';
import '../container/landing-page-container';

const LandingPage = {
  async render() {
    pageRender('landing');
    return '<landing-page-container></landing-page-container>';
  },

  async afterRender() {
    console.log('Halaman Landing Page');
  },
};

export default LandingPage;
