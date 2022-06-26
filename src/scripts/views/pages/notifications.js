import pageRender from '../../utils/page-render';
import '../container/notification-container';
import SessionLogin from '../../utils/session-login';

const Notifications = {
  async render() {
    pageRender('beranda', 'app');
    return '<notification-container></notification-container>';
  },

  async afterRender() {
    SessionLogin();
  },
};

export default Notifications;
