import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import pageRender from '../../utils/page-render';
import '../container/transaction-container';
import UrlParser from '../../routes/url-parser';
import getNumberFromString from '../../utils/getNumberFromString';
import IncomeTransactionIdb from '../../data/idb/income-transactions';
import ClientError from '../../execeptions/ClientError';
import ExpenseTransactionIdb from '../../data/idb/expense-transaction-idb';
import SessionLogin from '../../utils/session-login';
import API_ENDPOINT from '../../globals/api-endpoint';

const TransaksiPage = {
  async render() {
    pageRender('transaksi', 'app');
    return '<transaction-container></transaction-container>';
  },

  async afterRender() {
    SessionLogin();
    const url = UrlParser.parseActiveWithoutCombiner().id;
    const mainForm = document.querySelector('.trans-main-form');
    const navTransaction = document.querySelectorAll('.transaction-main-nav a');

    navTransaction.forEach((element) => {
      element.classList.remove('active');
      if (element.dataset.nav === url) element.classList.add('active');
    });

    url === 'in' ? mainForm.innerHTML = '<income-form></income-form>' : mainForm.innerHTML = '<expense-form></expense-form>';

    const formTransaction = document.querySelector('.trans-main-form form');

    formTransaction.addEventListener('submit', async (e) => {
      e.preventDefault();
      const money = getNumberFromString(formTransaction.querySelector('input#nominal').value);
      const category = formTransaction.querySelector('select.category').value;
      const date = formTransaction.querySelector('input#date').value;
      const desc = formTransaction.querySelector('input#desc').value;

      if (money === 0) throw new ClientError('Jumlah input tidak kosong');

      if (!date) throw new ClientError('Tanggal belum di isi');

      const result = {
        _id: nanoid(16),
        idFk: category,
        count: money,
        date,
        desc,
      };

      const forAPI = {
        id: result._id,
        user_id: JSON.parse(localStorage.getItem('appFin')).id,
        amount: result.count,
        note: result.desc,
        category_id: result.idFk,
        date: result.date,
      };

      if (url === 'in') {
        const hasil = await IncomeTransactionIdb.putData(result);
        const response = await fetch(API_ENDPOINT.storeIncome, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(forAPI),
        }).then((response) => response.json()).catch((err) => Swal.handleError(err));
        console.log(response);
        Swal.fire('Tersimpan', `Transaksi ${result.date} berhasil disimpan`, 'success').then(() => window.location.reload());
      }

      if (url === 'out') {
        const hasil = await ExpenseTransactionIdb.putData(result);
        console.log(forAPI);
        const response = await fetch(API_ENDPOINT.storeExpense, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(forAPI),
        }).then((response) => response.json()).catch((err) => Swal.handleError(err));
        Swal.fire('Tersimpan', `Transaksi ${result.date} berhasil disimpan`, 'success').then(() => window.location.reload());
      }
    });
  },
};

export default TransaksiPage;
