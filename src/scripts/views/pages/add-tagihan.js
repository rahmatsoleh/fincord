import UrlParser from '../../routes/url-parser';
import pageRender from '../../utils/page-render';
import '../container/add-tagihan-container';

const AddTagihanPage = {
  async render() {
    pageRender('tagihan', 'app');
    return '<add-tagihan-container></add-tagihan-container>';
  },

  async afterRender() {
    console.log('Halaman Add Tagihan');
  },

};

export default AddTagihanPage;
