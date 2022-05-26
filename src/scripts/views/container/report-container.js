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
          <a href="" data-nav="day" class="active">Harian</a>
          <a href="" data-nav="month">Bulanan</a>
          <a href="" data-nav="year">Tahunan</a>
        </section>
        <section class="report-grafik">
          <select>
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>
          <div id="chart"></div>
          <div class="report-grafik-sum">
            <div>
              <h3>Pemasukan</h3>
              <p>Rp. 10.000.000</p>
            </div>
            <div>
              <h3>Pengeluaran</h3>
              <p>Rp. 5.400.000</p>
            </div>
            <div>
              <h3>Sisa Saldo</h3>
              <p>Rp. 4.600.000</p>
            </div>
          </div>
        </section>
        <section class="report-history">
          <h3>Riwayat Transaksi</h3>
          <div class="report-history-nav">
            <button class="active">Semua</button>
            <button>Masuk</button>
            <button>Keluar</button>
          </div>
          <div class="report-history-list">
            <ul>
              <li>
                <div class="main-list">
                  <p>Masuk</p>
                  <h4>Gaji Pokok</h4>
                  <p>Rp. 5.000.000</p>
                </div>
                <div class="badge-list">
                  <p>12 Mei 2022</p>
                </div>
              </li>
              <li class="out">
                <div class="main-list">
                  <p>Keluar</p>
                  <h4>Transportasi</h4>
                  <p>Rp. 100.000</p>
                </div>
                <div class="badge-list">
                  <p>12 Mei 2022</p>
                </div>
              </li>
              <li class="out">
                <div class="main-list">
                  <p>Keluar</p>
                  <h4>Transportasi</h4>
                  <p>Rp. 100.000</p>
                </div>
                <div class="badge-list">
                  <p>12 Mei 2022</p>
                </div>
              </li>
              <li>
                <div class="main-list">
                  <p>Masuk</p>
                  <h4>Gaji Pokok</h4>
                  <p>Rp. 5.000.000</p>
                </div>
                <div class="badge-list">
                  <p>12 Mei 2022</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </article>
    `;
  }
}

customElements.define('report-container', ReportContainer);
