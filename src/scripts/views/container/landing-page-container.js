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
              <img src="fincord.png" alt="gambar aplikasi fincord">
            </div>
          </div>
        </div>
      </section>
      <section class="features"  id="mainY">
        <div class="header">
          <h1>Selamat Datang di Fincord</h1>
          <p>Nulla in elit vel felis consequat posuere et et felis. Aenean id lobortis magna. In molestie sollicitudin turpis, facilisis vestibulum nulla sollicitudin id. Proin consectetur scelerisque nulla vitae pulvinar. </p>
        </div>

        <div class="container f-1">
          <div class="left">
            <h2>Pembukuan</h2>
            <p>Donec volutpat ultricies leo sed volutpat. Phasellus interdum lacus sit amet laoreet consequat. Phasellus ac placerat neque, vel vulputate nisl. Sed tincidunt molestie massa at ornare. Nulla facilisi.</p>
          </div>
          <div class="right">
            <div class="img">
              <img src="fincord.png" alt="gambar aplikasi fincord">
            </div>
          </div>
        </div>

        <div class="container f-2">
          <div class="left">
            <h2>Prencanaan</h2>
            <p>Fusce dictum urna vel massa luctus sagittis ut sed magna. Donec feugiat tortor iaculis, maximus nibh quis, lobortis sapien. Nullam in massa nec felis dignissim sagittis eget a lorem. Cras at aliquet massa. Nam posuere nunc mauris. Suspendisse potenti.</p>
          </div>
          <div class="right">
            <div class="img">
              <img src="fincord.png" alt="gambar aplikasi fincord">
            </div>
          </div>
        </div>
        
        <div class="container f-1">
          <div class="left">
            <h2>Pengingat</h2>
            <p>Aliquam dignissim semper nibh, vitae dictum leo elementum vel. Ut sed eleifend nisi. Aliquam erat volutpat. Aenean id libero eget nunc blandit finibus vel at libero.</p>
          </div>
          <div class="right">
            <div class="img">
              <img src="fincord.png" alt="gambar aplikasi fincord">
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('landing-page-container', landingContainer);
