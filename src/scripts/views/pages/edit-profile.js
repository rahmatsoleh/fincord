import pageRender from '../../utils/page-render';
import SessionLogin from '../../utils/session-login';
import '../container/edit-profile-container';

const editProfilePage = {
  async render() {
    pageRender('edit-profile', 'app');
    return '<edit-profile-container></edit-profile-container>';
  },

  async afterRender() {
    SessionLogin();
  },
};

export default editProfilePage;
