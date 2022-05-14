import pageRender from '../../utils/page-render';

const LaporanPage = {
  async render() {
    pageRender('laporan', 'app');
    return '<h1>Halaman Laporan</h1>';
  },

  async afterRender() {
    console.log('Halaman Laporan');
  },
};

export default LaporanPage;
