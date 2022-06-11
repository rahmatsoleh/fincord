import pageRender from '../../utils/page-render';
import '../container/tagihan-container';

const TagihanPage = {
  async render() {
    pageRender('tagihan', 'app');
    return '<tagihan-container></tagihan-container>';
  },

  async afterRender() {
    console.log('Halaman Tagihan');
  },

};

export default TagihanPage;
