import pageRender from '../../utils/page-render';

const TransaksiPage = {
  async render() {
    pageRender('transaksi', 'app');
    return '<h1>Halaman Transaksi</h1>';
  },

  async afterRender() {
    console.log('Halaman Transaksi');
  },
};

export default TransaksiPage;
