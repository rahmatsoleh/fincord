import pageRender from '../../utils/page-render';
import '../container/profile-container';

const ProfilePage = {
  async render() {
    pageRender('profile', 'app');
    return '<profile-container></profile-container>';
  },

  async afterRender() {
    console.log('Halaman Profile');
  },
};

export default ProfilePage;
