import pageRender from '../../utils/page-render';

const BerandaPage = {
  async render() {
    pageRender('beranda', 'app');
    return '<h1>Halaman Beranda</h1>';
  },

  async afterRender() {
    console.log('Halaman Beranda');
  },
};

export default BerandaPage;
