import SessionLogin from '../../utils/session-login';
import pageRender from '../../utils/page-render';
import '../container/add-tagihan-container';

const AddTagihanPage = {
  async render() {
    pageRender('tagihan', 'app');
    return '<add-tagihan-container></add-tagihan-container>';
  },

  async afterRender() {
    SessionLogin();
  },

};

export default AddTagihanPage;
