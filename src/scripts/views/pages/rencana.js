import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import pageRender from '../../utils/page-render';
import '../container/rencana-container';
import SavingPlanIdb from '../../data/idb/saving-plan-idb';
import SessionLogin from '../../utils/session-login';
import API_ENDPOINT from '../../globals/api-endpoint';

const RencanaPage = {
  async render() {
    pageRender('rencana', 'app');
    return '<rencana-container></rencana-container>';
  },

  async afterRender() {
    SessionLogin();
    const addPlans = document.querySelector('#add-plans');

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

      if (formValues) {
        const result = {
          _id: nanoid(16),
          title: formValues.name,
          nominal: formValues.nominal,
          dateline: formValues.date,
        };

        const forAPI = {
          id: result._id,
          user_id: JSON.parse(localStorage.getItem('appFin')).id,
          name: result.title,
          goal_amount: result.nominal,
          due_date: result.dateline,
          type: 'monthly',
        };

        const response = await fetch(API_ENDPOINT.saving, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(forAPI),
        }).then((response) => response.json()).catch((err) => console.log(err));

        console.log(response);

        await SavingPlanIdb.putData(result);
        Swal.fire('Tersimpan', `Tabungan ${result.dateline} ${result.title} berhasil disimpan`, 'success').then(() => window.location.reload());
      }
    });
  },
};

export default RencanaPage;
