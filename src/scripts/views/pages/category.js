import Swal from 'sweetalert2';
import pageRender from '../../utils/page-render';
import UrlParser from '../../routes/url-parser';
import SessionLogin from '../../utils/session-login';
import '../container/category-container';
import getNumberFromString from '../../utils/getNumberFromString';
import IncomeCategoryIdb from '../../data/idb/income-category-idb';
import ExpenseCategoryIdb from '../../data/idb/expense-category-idb';
import FincordApi from '../../data/api/fincord-api';

const Category = {
  async render() {
    pageRender('transaksi', 'app');
    return '<category-container></category-container>';
  },

  async afterRender() {
    const userId = SessionLogin();
    const url = UrlParser.parseActiveWithoutCombiner().id;
    const navButtonCategory = document.querySelectorAll('.category-nav div a');
    const listCategory = document.querySelector('.category-main');

    navButtonCategory.forEach((element) => {
      element.classList.remove('active');

      if (element.dataset.nav === url) element.classList.add('active');
    });

    if (url === 'in') listCategory.innerHTML = '<income-category></income-category>';

    if (url === 'out') listCategory.innerHTML = '<expense-category></expense-category>';

    const formModal = document.querySelector('.category-modal form');
    formModal.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { method } = formModal.dataset;
      const id = formModal.querySelector('input#id-category').value;
      const name = formModal.querySelector('input#category-name').value;
      const created = formModal.querySelector('input#created').value;

      if (url === 'in') {
        const result = {
          _id: id,
          created_at: created,
          updated_at: new Date().toISOString(),
          title: name,
        };
        await IncomeCategoryIdb.putData(result);
        await FincordApi.manageCategory(method, {
          id: result._id,
          name: result.title,
          user_id: userId,
          type: 'income',
          limited: 0,
        });
        Swal.fire('Success', `${result.title} berhasil disimpan`, 'success').then(() => window.location.reload());
      }

      if (url === 'out') {
        const limit = getNumberFromString(formModal.querySelector('input#limit').value);
        const result = {
          _id: id,
          created_at: created,
          updated_at: new Date().toISOString(),
          title: name,
          limited: limit,
        };
        await ExpenseCategoryIdb.putData(result);

        await FincordApi.manageCategory(method, {
          id: result._id,
          name: result.title,
          user_id: userId,
          type: 'expense',
          limited: parseInt(result.limited),
        });
        Swal.fire('Success', `${result.title} berhasil disimpan`, 'success').then(() => window.location.reload());
      }
    });
  },
};

export default Category;
