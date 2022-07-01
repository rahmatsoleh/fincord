import '../items/plan-items';
import '../../../styles/component/list-plans.scss';
import Swal from 'sweetalert2';
import { nanoid } from 'nanoid';
import moment from 'moment';
import SavingPlanIdb from '../../data/idb/saving-plan-idb';
import SavingTransactionIdb from '../../data/idb/saving-transaction-idb';
import API_ENDPOINT from '../../globals/api-endpoint';

class ListPlans extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderList();
  }

  render() {
    this.innerHTML = `
      <div class="list-plans">
        <div class="not-found">
          <img src="no-data.svg" alt="Data masih kosong"/>
          <p>Data masih kosong</p>
        </div>
      </div>
    `;
  }

  async renderList() {
    const dataImpian = await SavingPlanIdb.getAllData();
    const tempList = this.querySelector('.list-plans');
    const sumCollectionPlan = await SavingTransactionIdb.getAllData();

    const sumCollectionTransaction = [];
    sumCollectionPlan.reduce((res, value) => {
      if (!res[value.idFK]) {
        res[value.idFK] = { idFK: value.idFK, save: 0 };
        sumCollectionTransaction.push(res[value.idFK]);
      }
      res[value.idFK].save += value.save;
      return res;
    }, {});

    let result = '';

    dataImpian.sort((a, b) => moment(a.dateline, 'YYYY-MM-DD').isBefore(moment(b.dateline, 'YYYY-MM-DD')) ? -1 : 1);

    dataImpian.forEach((item) => {
      let sum = 0;

      sumCollectionTransaction.forEach((savePlan) => {
        if (savePlan.idFK == item._id) sum = savePlan.save;
      });

      result += `
      <plan-items
          data-id="${item._id}"
          data-name="${item.title}"
          data-nominal="${item.nominal}"
          data-dateline="${item.dateline}"
          data-sum="${sum}"
      ></plan-items>
      `;
    });

    if (dataImpian.length > 0) tempList.innerHTML = result;

    const buttonDelete = document.querySelectorAll('.delete-button');
    buttonDelete.forEach((item) => item.onclick = () => {
      const { id } = item.dataset;

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
          const response = await fetch(`${API_ENDPOINT.saving}/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          }).then((response) => response.json()).catch((error) => console.log(error));
          console.log(response);
          await SavingPlanIdb.deleteData(id);
          Swal.fire(
            'Success',
            'Data berhasil terhapus',
            'success',
          ).then(() => window.location.reload());
        }
      });
    });

    const buttonAlokasi = document.querySelectorAll('.alokasi');
    buttonAlokasi.forEach((item) => item.onclick = async () => {
      const id = `save-${nanoid(16)}`;
      const { fk, name } = item.dataset;
      const dateNow = moment().format('YYYY-MM-DD');

      const { value: saveMoney } = await Swal.fire({
        title: 'Alokasikan Dana',
        input: 'number',
        inputLabel: `Uang untuk ${name}`,
        inputPlaceholder: 'Rp. 0',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Masukan uang anda terlebih dahulu !';
          }
        },
      });

      const findSum = sumCollectionTransaction.find((data) => data.idFK === fk);
      const dataSave = dataImpian.find((data) => data._id === fk);
      const cekTarget = parseInt(saveMoney) + parseInt(findSum ? findSum.save : 0);

      if (saveMoney) {
        if (cekTarget > parseInt(dataSave.nominal)) {
          Swal.fire('Uppss...', 'Uang anda melebihi target', 'warning');
          return;
        }
        const result = {
          _id: id,
          date: dateNow,
          save: parseInt(saveMoney),
          idFK: fk,
        };

        const userId = JSON.parse(localStorage.getItem('appFin')).id;

        const forAPI = {
          id: result._id,
          saving_plan_id: result.idFK,
          userId,
          save: result.save,
          date: result.date,
        };

        await SavingTransactionIdb.putData(result);

        await fetch(API_ENDPOINT.savingRecord, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(forAPI),
        }).then(() => {
          Swal.fire(
            'Success',
            'Uang anda berhasil disimpan',
            'success',
          ).then(() => window.location.reload());
        }).catch((error) => console.error(error));
      }
    });

    const buttonUpdate = document.querySelectorAll('.update-button');
    buttonUpdate.forEach((item) => item.onclick = async () => {
      const {
        id, name, nominal, dateline,
      } = item.dataset;

      const nominalMoney = parseInt(nominal);
      const { value: formValues } = await Swal.fire({
        title: 'Tambahkan Rencana',
        html:
          `<input type="text" id="name-plan" class="swal2-input" value="${name}">`
          + `<input type="number" id="nominal-plan" class="swal2-input" value="${nominalMoney}">`
          + `<input type="date" id="date-plan" class="swal2-input" value="${dateline}">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Simpan',
        preConfirm: () => ({
          title: document.getElementById('name-plan').value,
          nominal: document.getElementById('nominal-plan').value,
          date: document.getElementById('date-plan').value,
        }),
      });

      if (formValues) {
        const result = {
          _id: id,
          title: formValues.title,
          nominal: parseInt(formValues.nominal),
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

        await SavingPlanIdb.putData(result);

        await fetch(API_ENDPOINT.saving, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(forAPI),
        });

        Swal.fire('Tersimpan', `Tabungan ${result.dateline} ${result.title} berhasil diupdate`, 'success').then(() => window.location.reload());
      }
    });
  }
}

customElements.define('list-plans', ListPlans);
