import '../../../styles/container/landing-page-container.scss';

class landingContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="hero">
        <div class="container">
          <div class="left">
            <h1>Kelola pengeluaranmu & buat rencana keuangan <span>masa depanmu</span></h1>
            <p class="desc">Fitur-fitur menakjubkan yang dapat membantu mengelola keuangan dengan baik</p>
            <button class="btn"><a href="#mainY">Mulai</a></button>
            <p class="text-align-center">Lihat fitur-fitur kami</p>
          </div>
          <div class="right">
            <div class="img">
              <img src="app.png" alt="gambar aplikasi fincord">
            </div>
          </div>
        </div>
      </section>
      <section class="features"  id="mainY">
        <div class="header">
          <h1>Selamat Datang di Fincord</h1>
          <p>Perkenalkan di bawah ini merupakan beberapa hal tentang aplikasi keuangan Fincord</p>
        </div>

        <div class="container f-1">
          <div class="left">
            <h2>Bahkan orang awam pun dapat menggunakannya</h2>
            <p>Desain tampilan aplikasi keuangan ini yang didesain sederhana sehingga pengguna dapat dengan mudah memahami setiap fitur di dalamnya.</p>
          </div>
          <div class="right">
            <div class="img">
              <img src="beranda.png" alt="gambar beranda aplikasi fincord">
            </div>
          </div>
        </div>

        <div class="container f-2">
          <div class="left">
            <h2>Lacak uang sederhana</h2>
            <p>Catat transaksi harian dengan cepat dan masukkan ke dalam kategori yang jelas. Lihat pemasukan dan pengeluaran pada setiap periode karena dilengkapi dengan grafik.</p>
          </div>
          <div class="right">
            <div class="img">
              <img src="report.png" alt="gambar aplikasi fincord">
            </div>
          </div>
        </div>
        
        <div class="container f-1">
          <div class="left">
            <h2>Target kedepannya</h2>
            <p>Buat rencana keuangan agar impianmu dapat terwujud diakhir bulan.</p>
          </div>
          <div class="right">
            <div class="img">
              <img src="plan.png" alt="gambar aplikasi fincord">
            </div>
          </div>
        </div>
      </section>

      // <section class="exclusive">
      //   <div class="header">
      //     <h1>Selamat Datang di Fincord</h1>
      //     <p>Nulla in elit vel felis consequat posuere et et felis. Aenean id lobortis magna. In molestie sollicitudin turpis, facilisis vestibulum nulla sollicitudin id. Proin consectetur scelerisque nulla vitae pulvinar. </p>
      //   </div>

      //   <div class="container">
          
      //   </div>
      // </section>
    `;
  }
}

customElements.define('landing-page-container', landingContainer);
