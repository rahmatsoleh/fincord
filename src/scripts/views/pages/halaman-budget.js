import pageRender from '../../utils/page-render';
import '../component/target-landing';

const BerandaPage = {
  async render() {
    pageRender('beranda', 'app');
    return '<target-landing></target-landing>';
  },

  async afterRender() {
    console.log('Halaman Beranda');
  },
};

export default BerandaPage;
