import '../../../styles/container/transaction-container.scss';
import '../component/income-form';
import '../component/expense-form';

class TransactionContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <article class="transaction">
        <div class="transaction-header">
          <h2>Transaksi Keuangan</h2>
        </div>
        <section class="transaction-main">
          <div class="transaction-main-nav">
            <a href="/#/transaksi/in" data-nav="in" class="active">Pemasukan</a>
            <a href="/#/transaksi/out" data-nav="out">Pengeluaran</a>
          </div>
          <div class="trans-main-form">
            <income-form></income-form>
          </div>
        </section>
      </article>
    `;
  }
}

customElements.define('transaction-container', TransactionContainer);
