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

    // Transaksi keuangan berdasarkan kategori
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

      if (url === 'in') {
        const hasil = await IncomeTransactionIdb.putData(result);
        Swal.fire('Tersimpan', `Transaksi ${result.date} berhasil disimpan`, 'success').then(() => window.location.reload());
        console.log(hasil);
      }

      if (url === 'out') {
        const hasil = await ExpenseTransactionIdb.putData(result);
        Swal.fire('Tersimpan', `Transaksi ${result.date} berhasil disimpan`, 'success').then(() => window.location.reload());
        console.log(hasil);
      }
    });
  },
};

export default TransaksiPage;
