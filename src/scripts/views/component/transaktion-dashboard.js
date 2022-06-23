import '../../../styles/component/transaktion-dashboard.scss';
import cardExpends from '../items/card-transaktion';
import progressIndicator from '../../utils/progress-bar';

class TransaktionDashboard extends HTMLElement {
  constructor() {
    super();
    this._transaksi = [];
  }

  set props(value) {
    this._transaksi = value;
    const listTransaktion = document.querySelector('.dashboard-expend div');
    // listTransaktion.innerHTML = cardExpends(this._transaksi);
    this.renderProgressBar();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="dashboard-expend">
        <p class="title">Pengeluaran bulan ini</p>
        <div class="content">
          <img src="no-data.svg" alt="Data masih kosong"/>
          <p>Data masih kosong</p>
        </div>
      </div>
    `;
  }

  renderProgressBar() {
    progressIndicator(this._transaksi);
  }
}

customElements.define('transaktion-dashboard', TransaktionDashboard);
