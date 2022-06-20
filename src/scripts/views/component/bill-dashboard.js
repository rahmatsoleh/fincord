import cardBills from '../items/card-bill';
import '../../../styles/component/bill-dashboard.scss';

class BillDashboard extends HTMLElement {
  constructor() {
    super();
    this._tagihan = [];
  }

  set props(value) {
    this._tagihan = value;
    const billDashboard = document.querySelector('.bill-dashboard div.cards');
    billDashboard.innerHTML = cardBills(this._tagihan);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="bill-dashboard">
        <p>Tagihan Bulan Ini</p>
        <div class="cards">
        </div>
      </div>
    `;
  }
}

customElements.define('bill-dashboard', BillDashboard);
