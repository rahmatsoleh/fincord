import pageRender from '../../utils/page-render';

const RencanaPage = {
  async render() {
    pageRender('rencana', 'app');
    return '<h1>Halaman Rencana</h1>';
  },

  async afterRender() {
    console.log('Halaman Rencana');
  },
};

export default RencanaPage;
