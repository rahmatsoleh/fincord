import Swal from 'sweetalert2';
import pageRender from '../../utils/page-render';
import '../container/rencana-container';

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
          '<input type="text" id="name-plan" class="swal2-input">'
          + '<input type="number" id="nominal-plan" class="swal2-input">'
          + '<input type="date" id="date-plan" class="swal2-input">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Simpan',
        preConfirm: () => ({
          name: document.getElementById('name-plan').value,
          nominal: document.getElementById('nominal-plan').value,
          date: document.getElementById('date-plan').value,
        }),
      });

      console.log(formValues);
    });
  },
};

export default RencanaPage;
