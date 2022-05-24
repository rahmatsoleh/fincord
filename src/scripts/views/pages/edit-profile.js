import pageRender from '../../utils/page-render';
import '../container/edit-profile-container';

const editProfilePage = {
  async render() {
    pageRender('edit-profile', 'app');
    return '<edit-profile-container></edit-profile-container>';
  },

  async afterRender() {
    console.log('Halaman edit Profile');
  },
};

export default editProfilePage;
