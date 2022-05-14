import pageRender from '../../utils/page-render';

const TagihanPage = {
  async render() {
    pageRender('tagihan', 'app');
    return '<h1>Halaman Tagihan</h1>';
  },

  async afterRender() {
    console.log('Halaman Tagihan');
  },
};

export default TagihanPage;
