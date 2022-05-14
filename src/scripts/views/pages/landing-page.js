import pageRender from '../../utils/page-render';

const LandingPage = {
  async render() {
    pageRender('landing');
    return '<h1>Halaman Landing Page <i class="fa-solid fa-arrow-down"></i></h1>';
  },

  async afterRender() {
    console.log('Halaman Landing Page');
  },
};

export default LandingPage;
