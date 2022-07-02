import '../../../styles/container/tagihan-container.scss';
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import TagihanItemIdb from '../../data/idb/tagihan-item-idb';
import UrlParser from '../../routes/url-parser';
import API_ENDPOINT from '../../globals/api-endpoint';

class AddTagihanContainer extends HTMLElement {
  connectedCallback() {
    this.render();
    this.afterRender();
  }

  render() {
    this.innerHTML = `
        <section class='navbar-tagihan'>
            <h2 class='title'>Tambah Tagihan</h2>
        </section>
        <section class='form-tambah' data-method="POST">
          <form class="tagihan">
            <div class='form-group'>
                <p class='label'>Nama Tagihan</p>
                <input type='text' name='nama-tagihan' placeholder='Nama Tagihan' />
            </div>

            <div class='form-group'>
                <p class='label'>Jumlah Tagihan</p>
                <input type='text' name='jumlah-tagihan' placeholder='Rp' />
            </div>

            <div class='form-group'>
                <p class='label'>Tanggal Tagihan</p>
                <input type='date' name='tanggal-tagihan' placeholder='Tanggal Tagihan' />
            </div>

            <div class='flex items-center reminder check'>
                <input type="checkbox" id="reminder" name="reminder" value="remind">
                <label for="reminder" class='ml-2'>Ingatkan setiap bulan</label><br>
            </div>
            <div style="margin: 12px 16px">
                <button class='button simpan' type="submit">Simpan</button>
            </div>
          </form>
        </section>
    `;
  }

  async afterRender() {
    let id;
    const input = this.querySelectorAll('input');
    const formInput = this.querySelector('.form-tambah');
    if (UrlParser.parseActiveWithoutCombiner().id) {
      formInput.dataset.method = 'PUT';
      const headerTitle = document.querySelector('h2.title');
      headerTitle.textContent = 'Edit Tagihan';
      const data = await TagihanItemIdb.getAllData();
      const dataTagihan = data.find(
        (item) => item._id.toLowerCase() == UrlParser.parseActiveWithoutCombiner().id,
      );

      if (!dataTagihan) {
        window.location.href = '/#/404';
        return;
      }

      id = dataTagihan._id;
      input[0].value = dataTagihan.name;
      input[1].value = dataTagihan.payment;
      input[2].value = dataTagihan.date;
      if (dataTagihan.remember) {
        input[3].checked = true;
      }
    }
    const formSubmit = this.querySelector('form.tagihan');
    formSubmit.onsubmit = async (event) => {
      event.preventDefault();
      const dataForm = {
        _id: id || `bills-${nanoid(16)}`,
        name: input[0].value,
        payment: input[1].value,
        date: input[2].value,
        remember: input[3].checked,
        paid: false,
      };

      Swal.fire({
        title: 'Ingin menyimpan ?',
        text: `Anda akan menyimpan pengingat ${dataForm.name}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya Simpan',
        cancelButtonText: 'Nggak jadi',
      }).then(async (result) => {
        if (result.isConfirmed) {
          document.querySelector('.loading-wrapper').classList.remove('d-none');
          const { method } = formInput.dataset;
          await TagihanItemIdb.putData(dataForm);

          const userId = JSON.parse(localStorage.getItem('appFin')).id;

          const formApi = {
            id: dataForm._id,
            userId,
            name: dataForm.name,
            payment: dataForm.payment,
            date: dataForm.date,
            remember: dataForm.remember,
            status: dataForm.paid,
          };

          await fetch(API_ENDPOINT.bill, {
            method,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(formApi),
          });

          document.querySelector('.loading-wrapper').classList.add('d-none');

          Swal.fire({
            title: 'Berhasil!',
            text: 'Data berhasil disimpan',
            icon: 'success',
          }).then(() => {
            window.location.href = '#/tagihan';
          });
        }
      });
    };
  }
}

customElements.define('add-tagihan-container', AddTagihanContainer);
