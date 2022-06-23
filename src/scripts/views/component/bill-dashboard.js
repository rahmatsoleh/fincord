import moment from 'moment';
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

    const paidFalse = this._tagihan.filter((item) => item.paid === false)
      .sort((a, b) => moment(a.date, 'YYYY-MM-DD').isBefore(moment(b.date, 'YYYY-MM-DD')) ? -1 : 1);

    if (paidFalse.length > 0) {
      billDashboard.innerHTML = cardBills(paidFalse);
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="bill-dashboard">
        <p>Tagihan Bulan Ini</p>
        <div class="cards">
        <div class="not-found">
          <img src="no-data.svg" alt="Data masih kosong"/>
          <p>Data masih kosong</p>
        </div>
        </div>
      </div>
    `;
  }
}

customElements.define('bill-dashboard', BillDashboard);
