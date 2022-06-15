import '../items/plan-items';
import '../../../styles/component/list-plans.scss';
import Swal from 'sweetalert2';
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
    // let id;
    // Hapus
    const buttonDelete = document.querySelectorAll('.delete-button');
    buttonDelete.forEach((item) => item.onclick = () => {
      const { id } = item.dataset;
      // SavingPlanIdb.deleteData(id).then(() => { window.location.reload(); });

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
    buttonAlokasi.forEach((item) => {
      item.addEventListener('click', () => {
      });
    });
  }
}

customElements.define('list-plans', ListPlans);
