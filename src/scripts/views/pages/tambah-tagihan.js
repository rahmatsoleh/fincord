import pageRender from '../../utils/page-render';
import '../container/tambah-tagihan-container';

const TambahTagihanPage = {
  async render() {
    pageRender('tambah-tagihan', 'app');
    return '<tambah-tagihan-container></tambah-tagihan-container>';
  },

  async afterRender() {
    console.log('Halaman Tambah Tagihan');
  },
};

export default TambahTagihanPage;
