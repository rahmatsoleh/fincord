import '../../../styles/component/saldo-dashboard.scss';

class SaldoDashboard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="balance-dashboard">
        <div class="balance-dashboard-main">
          <p>Sisa saldo anda</p>
          <h2>Rp. 2.503.500,-</h2>
        </div>
        <div class="balance-trans">
          <div class="trans-item">
            <div>
              <i class="fa-solid fa-wallet"></i>
            </div>
            <div>
              <p>Pemasukan</p>
              <h3>Rp. 5.000.000</h3>
            </div>
          </div>
          <div class="trans-item">
            <div>
            <i class="fa-solid fa-money-bill-wave"></i>
            </div>
            <div>
              <p>Pengeluaran</p>
              <h3>Rp. 2.496.600</h3>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('saldo-dashboard', SaldoDashboard);
