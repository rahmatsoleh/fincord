import '../../../styles/container/tagihan-container.scss';
import { nanoid } from 'nanoid';
import TagihanItemIdb from '../../data/idb/tagihan-item-idb';
import UrlParser from '../../routes/url-parser';

class AddTagihanContainer extends HTMLElement {
  connectedCallback() {
    this.render();
    this.afterRender();
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
                <input type='time' class='input-reminder' name='reminder' placeholder='ex. 18.00' />
                <p class='label-reminder'>Pukul waktu penagihan</p>
            </div>

            <div style="margin: 12px 16px">
                <button class='button simpan'>Simpan</button>
            </div>
        </section>
    `;
  }

  async afterRender() {
    let id;
    const input = this.querySelectorAll('input');
    if (UrlParser.parseActiveWithoutCombiner().id) {
      const data = await TagihanItemIdb.getAllData();
      const dataTagihan = data.find((item) => item._id.toLowerCase() == UrlParser.parseActiveWithoutCombiner().id);
      // console.log(dataTagihan);
      id = dataTagihan._id;
      input[0].value = dataTagihan.name;
      input[1].value = dataTagihan.payment;
      input[2].value = dataTagihan.date;
      if (dataTagihan.remember) {
        input[3].checked = true;
      }
      input[4].value = dataTagihan.rememberBefore;
      input[5].value = dataTagihan.rememberTime;
    }
    const button = this.querySelector('button');
    button.onclick = async function () {
      const result = {
        _id: id || nanoid(),
        name: input[0].value,
        payment: input[1].value,
        date: input[2].value,
        remember: input[3].checked,
        rememberBefore: input[4].value,
        rememberTime: input[5].value,

      };
      const hasil = await TagihanItemIdb.putData(result).then(() => window.location.href = '#/tagihan');
    };
  }
}

customElements.define('add-tagihan-container', AddTagihanContainer);
