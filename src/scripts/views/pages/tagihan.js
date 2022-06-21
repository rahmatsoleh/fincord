import pageRender from '../../utils/page-render';
import '../container/tagihan-container';

const TagihanPage = {
  async render() {
    pageRender('tagihan', 'app');
    return '<tagihan-container></tagihan-container>';
  },

  // eslint-disable-next-line no-empty-function
  async afterRender() {},

};

export default TagihanPage;
