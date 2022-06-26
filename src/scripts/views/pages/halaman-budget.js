import pageRender from '../../utils/page-render';
import SessionLogin from '../../utils/session-login';
import '../component/target-landing';

const BerandaPage = {
  async render() {
    pageRender('beranda', 'app');
    return '<target-landing></target-landing>';
  },

  async afterRender() {
    SessionLogin();
  },
};

export default BerandaPage;
