import '../../../styles/container/page-notfound.scss';
import pageRender from '../../utils/page-render';
import SessionLogin from '../../utils/session-login';

const PageNotfound = {
  async render() {
    pageRender('pagenotfound');

    return `
      <article class="page-notfound">
        <img src="not-found.svg" alt="Halaman tidak tersedia"/>
        <p>Halaman yang anda cari tidak tersedia</p>
        <a href="/#/beranda">Kembali Ke beranda</a>
      </article>
    `;
  },

  async afterRender() {
    SessionLogin();
  },
};

export default PageNotfound;
