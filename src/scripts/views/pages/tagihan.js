import pageRender from '../../utils/page-render';
import '../container/tagihan-container';
import SessionLogin from '../../utils/session-login';

const TagihanPage = {
  async render() {
    pageRender('tagihan', 'app');
    return '<tagihan-container></tagihan-container>';
  },

  // eslint-disable-next-line no-empty-function
  async afterRender() {
    SessionLogin();
  },

};

export default TagihanPage;
