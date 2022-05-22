import cardBills from '../items/card-bill';
import '../../../styles/component/bill-dashboard.scss';

const tagihan = [
  {
    name: 'Pembayaran wifi',
    jumlah: '110000',
    tanggal: '12 Mei 2022',
  },
  {
    name: 'Pembayaran paket Data Internet',
    jumlah: '50000',
    tanggal: '23 Mei 2022',
  },
  {
    name: 'Pembayaran Gym',
    jumlah: '150000',
    tanggal: '20 Mei 2022',
  },
];

class BillDashboard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="bill-dashboard">
        <p>Tagihan Bulan Ini</p>
        <div class="cards">
          ${cardBills(tagihan)}
        </div>
      </div>
    `;
  }
}

customElements.define('bill-dashboard', BillDashboard);
