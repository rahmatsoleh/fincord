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
    this.dataTransaktion = [];

    this._transaksi.forEach((item) => {
      this.dataTransaktion.push({
        id: item.id,
        name: item.name,
        use: item.use || 0,
        max: item.max || 1000000,
      });
    });
    const listTransaktion = document.querySelector('.dashboard-expend div');

    if (this.dataTransaktion.length > 0) {
      listTransaktion.innerHTML = cardExpends(this.dataTransaktion);
      this.renderProgressBar();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="dashboard-expend">
        <p class="title">Pengeluaran bulan ini</p>
        <div class="content">
          <div class="not-found">
            <img src="no-data.svg" alt="Data masih kosong"/>
            <p>Data masih kosong</p>
          </div>
        </div>
      </div>
    `;
  }

  renderProgressBar() {
    progressIndicator(this.dataTransaktion);
  }
}

customElements.define('transaktion-dashboard', TransaktionDashboard);
