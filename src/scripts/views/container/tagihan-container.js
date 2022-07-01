import Swal from 'sweetalert2';
import moment from 'moment';
import '../../../styles/container/tagihan-container.scss';
import TagihanItemIdb from '../../data/idb/tagihan-item-idb';
import '../items/tagihan-item';
import API_ENDPOINT from '../../globals/api-endpoint';

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
          <div class="not-found">
            <img src="no-data.svg" alt="Data masih kosong"/>
            <p>Data masih kosong</p>
          </div>
        </section>
    `;
  }

  async renderList() {
    const dataTagihan = await TagihanItemIdb.getAllData();
    const content = document.querySelectorAll('.wrapper-content')[0];
    let card = '';

    const paidTrue = dataTagihan.filter((item) => item.paid === true)
      .sort((a, b) => moment(a.date, 'YYYY-MM-DD').isBefore(moment(b.date, 'YYYY-MM-DD')) ? 1 : -1);

    const paidFalse = dataTagihan.filter((item) => item.paid === false)
      .sort((a, b) => moment(a.date, 'YYYY-MM-DD').isBefore(moment(b.date, 'YYYY-MM-DD')) ? -1 : 1);

    const resumeBills = [...paidFalse, ...paidTrue];

    resumeBills
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

    if (dataTagihan.length > 0) content.innerHTML = card;

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
        }).then(async (result) => {
          if (result.isConfirmed) {
            await TagihanItemIdb.deleteData(id);

            const userId = JSON.parse(localStorage.getItem('appFin')).id;

            await fetch(API_ENDPOINT.bill, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: JSON.stringify({ id, userId }),
            });

            Swal.fire({
              title: 'Berhasil!',
              text: 'Data berhasil dihapus',
              icon: 'success',
            }).then(() => {
              window.location.reload();
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
    const buttonReminder = document.querySelectorAll('.add-reminder')[0];

    buttonReminder.addEventListener('click', async () => {
      window.location.href = '#/add-tagihan';
    });
  }
}

customElements.define('tagihan-container', TagihanContainer);
