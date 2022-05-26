import '../../../styles/component/navigation.scss';

class Navigiation extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <ul>
        <li class="beranda">
          <a href="#/beranda">
            <span><i class="fa-solid fa-house"></i></span>
            <span>Beranda</span>
          </a>
        </li>
        <li class="laporan">
          <a href="#/laporan/${new Date().getMonth() + 1}/${new Date().getFullYear()}">
            <span><i class="fa-solid fa-square-poll-vertical"></i></span>
            <span>Laporan</span>
          </a>
        </li>
        <li class="transaksi">
          <a href="#/transaksi/in">
            <span><i class="fa-solid fa-circle-plus"></i></span>
            <span>Transaksi</span>
          </a>
        </li>
        <li class="rencana">
          <a href="#/rencana">
            <span><i class="fa-solid fa-wallet"></i></span>
            <span>Rencana</span>
          </a>
        </li>
        <li class="tagihan">
          <a href="#/tagihan">
            <span><i class="fa-solid fa-money-bills"></i></span>
            <span>Tagihan</span>
          </a>
        </li>
      </ul>
    `;
  }
}

customElements.define('nav-bar', Navigiation);
