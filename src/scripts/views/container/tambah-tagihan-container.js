import '../../../styles/container/tagihan-container.scss';

class TambahTagihanContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <section class='navbar-tagihan'>
            <h1 class='title'>Tambah Tagihan</h1>
        </section>
        <section class='form-tambah'>
        
            <div class='form-group'>
                <p class='label'>Nama Tagihan</p>
                <input type='text' name='nama-tagihan' placeholder='Nama Tagihan' />
            </div>

            <div class='form-group'>
                <p class='label'>Jumlah Tagihan</p>
                <input type='text' name='jumlah-tagihan' placeholder='Jumlah Tagihan ( ex. Rp. 100.000 )' />
            </div>

            <div class='form-group'>
                <p class='label'>Tanggal Tagihan</p>
                <input type='date' name='tanggal-tagihan' placeholder='Tanggal Tagihan' />
            </div>

            <div class='flex items-center reminder check'>
                <input type="checkbox" id="reminder" name="reminder" value="remind">
                <label for="reminder" class='ml-2'>Ingatkan setiap bulan</label><br>
            </div>

            <div class='flex items-center reminder'>
                <input type='number' class='input-reminder' name='reminder' placeholder='10' />
                <p class='label-reminder'>Hari sebelum penagihan</p>
            </div>

            <div class='flex items-center reminder'>
                <input type='number' class='input-reminder' name='reminder' placeholder='ex. 18.00' />
                <p class='label-reminder'>Pukul waktu penagihan</p>
            </div>

            <div style="margin: 12px 16px">
                <button class='button simpan'>Simpan</button>
            </div>
        </section>
    `;
  }
}

customElements.define('tambah-tagihan-container', TambahTagihanContainer);
