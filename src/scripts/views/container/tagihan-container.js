import '../../../styles/container/tagihan-container.scss';

class TagihanContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <section class='navbar-tagihan'>
            <h1 class='title'>Daftar Tagihan</h1>
            <button class='add-reminder'>Tambahkan Pengingat</button>
        </section>
        <section class='modal'>
            <h1 class='heading'>Pembayaran Wifi</h1>
            <input type='text' name='nominal-tagihan' placeholder='Ex. 250.000' class='input-nominal' />
            <button class='button-save'>Simpan</button>
            <button class='button-cancel'>Batal</button>
        </section>
        <section class='wrapper-content'>
        <div class='content-tagihan'>
            <div>
                <h3 class='title-content'>Pembayaran WiFi</h3>
                <h3 class='total-count'>Rp. 250.000</h3>
                <button class='pay-button'>Bayar Sekarang</button>
            </div>
            <div>
                <h4 class='heading'>Maksimal Pembayaran</h4>
                <h4 class='subheading'>20 Juni</h4>
                <p class='remaining'>5 Hari Lagi</p>
                <div class='flex items-center action'>
                    <button class='button edit-button'>
                        <span class="icon">
                        <i class="fa-solid mr-1 fa-edit"></i>
                        </span>
                    Edit</button>
                    <button class='button delete-button'>
                        <span class="icon">
                        <i class="fa-solid mr-1 fa-trash"></i>
                        </span>
                    Hapus</button>
                </div>
            </div>
        </div>
        <div class='content-tagihan'>
            <div>
                <h3 class='title-content'>Pembayaran WiFi</h3>
                <h3 class='total-count'>Rp. 870.000</h3>
                <button class='pay-button'>Bayar Sekarang</button>
            </div>
            <div>
                <h4 class='heading'>Maksimal Pembayaran</h4>
                <h4 class='subheading'>28 Oktober</h4>
                <p class='remaining'>27 Hari Lagi</p>
                <div class='flex items-center action'>
                    <button class='button edit-button'>
                        <span class="icon">
                        <i class="fa-solid mr-1 fa-edit"></i>
                        </span>
                    Edit</button>
                    <button class='button delete-button'>
                        <span class="icon">
                        <i class="fa-solid mr-1 fa-trash"></i>
                        </span>
                    Hapus</button>
                </div>
            </div>
        </div>
        </section>
    `;
  }
}

// modif this \ not working
const buttonPay = document.querySelectorAll('.pay-button');
const cancelButton = document.querySelectorAll('.button-cancel');
const modals = document.querySelectorAll('.modal');

buttonPay.onclick = function () {
  modals.style.display = 'block';
};

cancelButton.onclick = function () {
  modals.style.display = 'none';
};

customElements.define('tagihan-container', TagihanContainer);
