import { nanoid } from 'nanoid';
import '../../../styles/container/tagihan-container.scss';
import TagihanHistory from '../../data/idb/tagihan-history-idb';
import TagihanItemIdb from '../../data/idb/tagihan-item-idb';
import '../items/tagihan-item';
import Swal from 'sweetalert2';

class TagihanContainer extends HTMLElement {
  connectedCallback() {
    this.render();
    this.afterRender();
    this.renderList();
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
        
        </section>
    `;
  }

  async renderList() {
    const dataTagihan = await TagihanItemIdb.getAllData();
    const content = document.querySelectorAll('.wrapper-content')[0];
    let card = '';

    dataTagihan
      .sort(
        (a, b) =>
          parseInt(this.reminder(b.date, b.rememberBefore)) -
          parseInt(this.reminder(a.date, a.rememberBefore))
      )
      .forEach((item) => {
        card += `
      <tagihan-item
          data-id="${item._id}"
          data-name="${item.name}"
          data-payment="${item.payment}"
          data-date="${item.date}"
          data-remember="${item.remember}"
          data-remember_before="${item.rememberBefore}"
          data-remember_time="${item.rememberTime}"
      ></tagihan-item>
      `;
      });

    content.innerHTML = card;
    const buttonPay = document.querySelectorAll('.pay-button');
    const buttonEdit = document.querySelectorAll('.edit-button');
    const buttonDelete = document.querySelectorAll('.delete-button');
    const buttonSave = document.querySelectorAll('.button-save')[0];
    const cancelButton = document.querySelectorAll('.button-cancel')[0];
    const modals = document.querySelectorAll('.modal')[0];
    let id;
    buttonPay.forEach(
      (el) =>
        (el.onclick = function () {
          id = el.dataset.id;
          modals.style.display = 'block';
          modals.style.visibility = 'visible';
        })
    );
    buttonDelete.forEach(
      (el) =>
        (el.onclick = function () {
          id = el.dataset.id;
          TagihanItemIdb.deleteData(id).then(() => {
            Swal.fire({
              title: 'Berhasil!',
              text: 'Data berhasil dihapus',
              icon: 'success',
            }).then(() => {
              window.location.reload();
            });
          });
        })
    );
    buttonEdit.forEach(
      (el) =>
        (el.onclick = function () {
          id = el.dataset.id;
          window.location.href = `#/edit-tagihan/${id}`;
        })
    );

    buttonSave.onclick = async function () {
      const nominal = modals.querySelector('input').value;
      const result = {
        _id: nanoid(16),
        date: new Date(),
        idTagihan: id,
        nominal,
      };

      const hasil = await TagihanHistory.putData(result).then(() =>
      Swal.fire({
        title: 'Berhasil!',
        text: 'Aksi Berhasil',
        icon: 'success',
      }).then(() => {
        window.location.href = '#/tagihan';
      })
      );
      modals.style.display = 'none';
      modals.style.visibility = 'hidden';
    };

    cancelButton.onclick = function () {
      modals.style.display = 'none';
      modals.style.visibility = 'hidden';
    };
  }

  async afterRender() {
    // modif this \ not working
    const buttonReminder = document.querySelectorAll('.add-reminder')[0];

    // const modals = document.querySelectorAll('.modal')[0];
    buttonReminder.addEventListener('click', async () => {
      window.location.href = '#/add-tagihan';
    });
  }

  reminder(date, rememberBefore) {
    const dateNow = new Date();
    const endDate = new Date(date);
    const differentTime = dateNow.getTime() - endDate.getTime();
    const differentOfDay = Math.ceil(differentTime / (24 * 3600 * 1000));
    const reminder = Math.ceil(differentOfDay - rememberBefore);
    return reminder;
  }
}

customElements.define('tagihan-container', TagihanContainer);
