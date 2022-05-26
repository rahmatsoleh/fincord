import pageRender from '../../utils/page-render';
import '../container/transaction-container';
import UrlParser from '../../routes/url-parser';

const TransaksiPage = {
  async render() {
    pageRender('transaksi', 'app');
    return '<transaction-container></transaction-container>';
  },

  async afterRender() {
    const url = UrlParser.parseActiveWithoutCombiner().id;
    const mainForm = document.querySelector('.trans-main-form');
    const navTransaction = document.querySelectorAll('.transaction-main-nav a');

    navTransaction.forEach((element) => {
      element.classList.remove('active');
      if (element.dataset.nav === url) element.classList.add('active');
    });

    url === 'in' ? mainForm.innerHTML = '<income-form></income-form>' : mainForm.innerHTML = '<expense-form></expense-form>';
  },
};

export default TransaksiPage;
