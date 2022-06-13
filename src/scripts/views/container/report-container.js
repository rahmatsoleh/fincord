import '../../../styles/container/report-container.scss';

class ReportContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <article class="report">
        <section class="report-header">
          <h2>Laporan</h2>
        </section>
        <section class="report-nav">
          <button data-nav="week" class="active">Mingguan</button>
          <button data-nav="month">Bulanan</button>
          <button data-nav="year">Tahunan</button>
        </section>
        <section class="report-grafik">
          <select>
          </select>
          <div id="chart"></div>
          <div class="report-grafik-sum">
            <div>
              <h3>Pemasukan</h3>
              <p id="income"></p>
            </div>
            <div>
              <h3>Pengeluaran</h3>
              <p id="expense"></p>
            </div>
            <div>
              <h3>Sisa Saldo</h3>
              <p id="remain"></p>
            </div>
          </div>
        </section>
        <section class="report-history">
          <h3>Riwayat Transaksi</h3>
          <div class="report-history-nav">
            <button class="active" data-nav="all">Semua</button>
            <button data-nav="in">Masuk</button>
            <button data-nav="out">Keluar</button>
          </div>
          <div class="report-history-list">
            <ul></ul>
          </div>
        </section>
      </article>
    `;
  }
}

customElements.define('report-container', ReportContainer);
