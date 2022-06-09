/* eslint-disable import/order */
import Swal from 'sweetalert2';
import pageRender from '../../utils/page-render';
import '../container/rencana-container';
import { nanoid } from 'nanoid';
import SavingPlanIdb from '../../data/idb/saving-plan-idb';

const RencanaPage = {
  async render() {
    pageRender('rencana', 'app');
    return '<rencana-container></rencana-container>';
  },

  async afterRender() {
    const addPlans = document.querySelector('#add-plans');

    // Add new plan
    addPlans.addEventListener('click', async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Tambahkan Rencana',
        html:
          '<input type="text" id="name-plan" class="swal2-input" placeholder="Masukan nama target">'
          + '<input type="number" id="nominal-plan" class="swal2-input" placeholder="Rp. 0">'
          + '<input type="date" id="date-plan" class="swal2-input" placeholder="Tanggal pencapaian">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Simpan',
        preConfirm: () => ({
          name: document.getElementById('name-plan').value,
          nominal: document.getElementById('nominal-plan').value,
          date: document.getElementById('date-plan').value,
        }),
      });
      const result = {
        _id: nanoid(16),
        title: formValues.name,
        nominal: formValues.nominal,
        dateline: formValues.date,
      };

      const hasil = await SavingPlanIdb.putData(result);
      Swal.fire('Tersimpan', `Tabungan ${result.dateline} ${result.title} berhasil disimpan`, 'success').then(() => window.location.reload());
      console.log(hasil);
    });
  },
};

export default RencanaPage;
