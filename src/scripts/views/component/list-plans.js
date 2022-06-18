/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import '../items/plan-items';
import '../../../styles/component/list-plans.scss';
import Swal from 'sweetalert2';
import { nanoid } from 'nanoid';
import SavingPlanIdb from '../../data/idb/saving-plan-idb';

// const rencana = [
//   {
//     id: 'aa11',
//     name: 'Uang untuk rakit PC',
//     nominal: 12000000,
//     dateline: '2022-08-20',
//     sum: 8000000,
//   },
//   {
//     id: 'aa22',
//     name: 'Uang untuk beli rumah',
//     nominal: 120000000,
//     dateline: '2024-05-17',
//     sum: 1000000,
//   },
//   {
//     id: 'aa33',
//     name: 'Uang untuk resepsi nikah',
//     nominal: 100000000,
//     dateline: '2025-06-20',
//     sum: 500000,
//   },
// ];

class ListPlans extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderList();
  }

  render() {
    this.innerHTML = `
      <div class="list-plans">
        
      </div>
    `;
  }

  async renderList() {
    const dataImpian = await SavingPlanIdb.getAllData();
    const tempList = this.querySelector('.list-plans');

    let result = '';

    dataImpian.forEach((item) => {
      if (item.data) {
        item.sum = item.data.reduce((a, b) => a + b.save);
      } else {
        item.sum = 0;
      }
      result += `
      <plan-items
          data-id="${item._id}"
          data-name="${item.title}"
          data-nominal="${item.nominal}"
          data-dateline="${item.dateline}"
          data-sum="${item.sum}"
      ></plan-items>
      `;
    });

    tempList.innerHTML = result;
    // Hapus
    const buttonDelete = document.querySelectorAll('.delete-button');
    buttonDelete.forEach((item) => item.onclick = () => {
      const { id } = item.dataset;

      /** resolve */
      Swal.fire({
        title: 'Apakah anda yakin ?',
        text: 'Data yang dihapus tidak bisa dikembalikan.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await SavingPlanIdb.deleteData(id).then(() => {
            Swal.fire(
              'Success',
              'Data berhasil terhapus',
              'success',
            ).then(() => window.location.reload());
          });
        }
      });
    });

    // Alokasi
    const buttonAlokasi = document.querySelectorAll('.alokasi');
    buttonAlokasi.forEach((item) => item.onclick = () => {
    });

    // Edit
    const buttonUpdate = document.querySelectorAll('.update-button');
    buttonUpdate.forEach((item) => item.onclick = async () => {
      const {
        id, name, nominal, dateline,
      } = item.dataset;
      const { value: formValues } = await Swal.fire({
        title: 'Tambahkan Rencana',
        html:
          `<input type="text" id="name-plan" class="swal2-input" placeholder="${name}">`
          + `<input type="number" id="nominal-plan" class="swal2-input" placeholder="Rp. ${nominal}">`
          + `<input type="date" id="date-plan" class="swal2-input" placeholder="${dateline}">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Simpan',
        preConfirm: () => ({
          title: document.getElementById('name-plan').value,
          nominal: document.getElementById('nominal-plan').value,
          date: document.getElementById('date-plan').value,
        }),
      });
      const result = {
        _id: id,
        title: formValues.title,
        nominal: formValues.nominal,
        dateline: formValues.date,
      };

      const hasil = await SavingPlanIdb.putData(result);
      Swal.fire('Tersimpan', `Tabungan ${result.dateline} ${result.title} berhasil diupdate`, 'success').then(() => window.location.reload());
      console.log(hasil);
    });
  }
}

customElements.define('list-plans', ListPlans);
