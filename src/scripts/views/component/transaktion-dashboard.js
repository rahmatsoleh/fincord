import '../../../styles/component/transaktion-dashboard.scss';
import cardExpends from '../items/card-transaktion';
import progressIndicator from '../../utils/progress-bar';

const transaksi = [
  {
    id: '111',
    name: 'Transportasi',
    max: 1000000,
    use: 350000,
  },
  {
    id: '222',
    name: 'Makan dan Minum',
    max: 900000,
    use: 635000,
  },
  {
    id: '333',
    name: 'Hiburan',
    max: 500000,
    use: 450000,
  },
  {
    id: '444',
    name: 'Investasi',
    max: 2000000,
    use: 350000,
  },
];

class TransaktionDashboard extends HTMLElement {
  constructor() {
    super();
    this._transaksi = [];
  }

  set props(value) {
    this._transaksi = value;
    const listTransaktion = document.querySelector('.dashboard-expend div');
    listTransaktion.innerHTML = cardExpends(this._transaksi);
    this.renderProgressBar();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="dashboard-expend">
        <p class="title">Pengeluaran bulan ini</p>
        <div>
        </div>
      </div>
    `;
  }

  renderProgressBar() {
    progressIndicator(this._transaksi);
  }
}

customElements.define('transaktion-dashboard', TransaktionDashboard);
