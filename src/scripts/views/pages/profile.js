import pageRender from '../../utils/page-render';
import '../container/profile-container';
import SessionLogin from '../../utils/session-login';

const ProfilePage = {
  async render() {
    pageRender('profile', 'app');
    return '<profile-container></profile-container>';
  },

  async afterRender() {
    SessionLogin();
  },
};

export default ProfilePage;
