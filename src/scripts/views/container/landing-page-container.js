import '../../../styles/container/landing-page-container.scss';

class landingContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="landing">
    <div class="home"> 

        <div class="content">
            <h3>Financial Record</h3>
            <p>Aplikasi untuk membantu pencatatan keuangan pribadimu agar kamu lebih hemat dan produktif. Dengan fitur responsive desain sehingga dapat digunakan di berbagai perangkatmu baik handphone, tablet, maupun komputer.</p>
            <button><a href="/#/login">Mulai</a></button>
        </div>

    </div>    
    

    <div class="about">
    
        <h1 class="heading">Buka aplikasi dan catat uangmu</h1>
    
    <div class="row">
            
        <div class="image">
            <img src="app.png" alt="Tampilan aplikasi financial record" loading="lazy">
        </div>    
    
        <div class="content">
            <h3>Kenali Aplikasi Financial Record</h3>
            <p>Aplikasi yang dibuat khusus untuk kamu yang ingin sekali hidup lebih hemat. Dengan mencatat keuanganmu, kamu akan tahu seberapa besar kamu berhemat. Dengan berhemat keuanganmu menjadi sehat.</p>
            <p>Solusi cerdas untuk mencatat keuanganmu agar hidup bisa lebih hemat.</p>
        </div>
    
    </div>
    
    </div>    
      
    <div class="usage">
    
        <h1 class="heading">Kenapa Harus Financial Record ?</h1>
    
        <div class="row">
    
            <div class="box-container">
                <div class="box">
                    <i class="fa-solid fa-money-bill-transfer"></i>
                    <h3>Pemasukan dan Pengeluaran</h3>
                    <p>Dengan mencatat pemasukan dan pengeluaran keuanganmu, maka kamu akan dapat memantau pergerakan keuanganmu apakah sehat atau tidak.</p>
                </div>
                <div class="box">
                    <i class="fa-solid fa-piggy-bank"></i>
                    <h3>Perencana Keuangan</h3>
                    <p>Dilengkapi fitur untuk merencanakan keuanganmu agar kamu dapat mengalokasikan uangmu untuk mengejar mimpimu.</p>
                </div>
            </div>
    
            <img src="beranda.png" alt="Tampilan beranda aplikasi" loading="lazy">
    
            <div class="box-container">
                <div class="box">
                    <i class="fa-solid fa-coins"></i>
                    <h3>Batasi pengeluaranmu</h3>
                    <p>Dengan fitur budgetin maka kamu akan dapat mengerem pengeluaranmu sehingga kamu dapat bisa lebih hemat lagi dalam mengeluarkan uangmu.</p>
                </div>
                <div class="box">
                    <i class="fa-solid fa-receipt"></i>
                    <h3>Laporan Keuangan</h3>
                    <p>Lihat laporan keuanganmu agar kamu dapat melihat riwayat transaksi yang sudah kamu catat untuk menganalis keuangamu.</p>
                </div>
            </div>
    
        </div>
    
    </div>    
    
    
    <div class="features">
    
        <h1 class="heading">Fitur Kami</h1>
    
        <div class="box-container">
    
            <div class="box">
                <i class="fa-solid fa-window-restore"></i>
                <h3>Responsive Design</h3>
                <p>Aplikasi yang dapat digunakan pada seluruh perangkat baik komputer maupun seluler dengan tampilan yang simple dan menarik sehingga mudah digunakan.</p>
            </div>
            <div class="box">
                <i class="fas fa-globe"></i>
                <h3>Terkoneksi Internet</h3>
                <p>Aplikasi dapat menyimpan data transaksi secara online untuk menjaga keamanan datamu agar selalu tersedia jika ingin berpindah perangkat.</p>
                </div>
            <div class="box">
                <i class="fa-solid fa-sack-dollar"></i>
                <h3>Rencana Keuangan</h3>
                <p>Terdapat fitur untuk melakukan perencanaan keuangan untuk target masa depan sehingga dapat memperkirakan alokasi uang yang harus disimpan.</p>
            </div>
            <div class="box">
                <i class="fa-solid fa-chart-line"></i>
                <h3>Data Visual</h3>
                <p>Dilengkapi grafik agar dapat memantau dengan mudah dalam transaksi pengeluaran dan pemasukan secara periodik yang mudah dibaca.</p>
            </div>
            <div class="box">
                <i class="fa-solid fa-file-invoice"></i>
                <h3>Pengingat Tagihan</h3>
                <p>Fitur untuk pengingat tagihan untuk mengingatkan agar dapat meminimalisir tagihan yang bengkak.</p>
            </div>
            <div class="box">
                <i class="fa-solid fa-money-bill-trend-up"></i>
                <h3>Budget Pengeluaran</h3>
                <p>fitur untuk membatasi pengeluaran dapat menghebat seberapa besar uang yang dikeluarkan.</p>
            </div>
    
        </div>
    
    </div>    
    </section>
    `;
  }
}

customElements.define('landing-page-container', landingContainer);
