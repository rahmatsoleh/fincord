import pageRender from '../../utils/page-render';
import '../container/notification-container';

const Notifications = {
  async render() {
    pageRender('beranda', 'app');
    return '<notification-container></notification-container>';
  },

  async afterRender() {
    console.log('Halaman Notifikasi');
  },
};

export default Notifications;
