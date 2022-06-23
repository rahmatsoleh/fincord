import pageRender from '../../utils/page-render';
import '../container/notification-container';

const Notifications = {
  async render() {
    pageRender('beranda', 'app');
    return '<notification-container></notification-container>';
  },

  // eslint-disable-next-line no-empty-function
  async afterRender() {},
};

export default Notifications;
