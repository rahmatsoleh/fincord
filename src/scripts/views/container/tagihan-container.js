/* eslint-disable radix */
import Swal from 'sweetalert2';
import '../../../styles/container/tagihan-container.scss';
import TagihanItemIdb from '../../data/idb/tagihan-item-idb';
import '../items/tagihan-item';

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
        (a, b) => parseInt(this.reminder(b.date, b.rememberBefore))
          - parseInt(this.reminder(a.date, a.rememberBefore)),
      )
      .forEach((item) => {
        card += `
      <tagihan-item
          data-id="${item._id}"
          data-name="${item.name}"
          data-payment="${item.payment}"
          data-date="${item.date}"
          data-remember="${item.remember}"
          data-paid="${item.paid}"
      ></tagihan-item>
      `;
      });

    content.innerHTML = card;
    const buttonEdit = document.querySelectorAll('.edit-button');
    const buttonDelete = document.querySelectorAll('.delete-button');
    buttonDelete.forEach(
      (el) => (el.onclick = () => {
        const { id } = el.dataset;

        Swal.fire({
          title: 'Apakah anda yakin ?',
          text: 'Apakah anda yakin ingin menghapus data ini',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Hapus',
          cancelButtonText: 'Batal',
        }).then((result) => {
          if (result.isConfirmed) {
            TagihanItemIdb.deleteData(id).then(() => {
              Swal.fire({
                title: 'Berhasil!',
                text: 'Data berhasil dihapus',
                icon: 'success',
              }).then(() => {
                window.location.reload();
              });
            });
          }
        });
      }),
    );
    buttonEdit.forEach(
      (el) => (el.onclick = () => {
        const { id } = el.dataset;
        window.location.href = `#/edit-tagihan/${id}`;
      }),
    );
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
