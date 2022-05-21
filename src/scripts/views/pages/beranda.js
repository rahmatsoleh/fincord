import pageRender from '../../utils/page-render';
import '../container/dashboard-container';

const BerandaPage = {
  async render() {
    pageRender('beranda', 'app');
    return '<dashboard-container></dashboard-container>';
  },

  async afterRender() {
    console.log('Halaman Beranda');
  },
};

export default BerandaPage;
