import pageRender from '../../utils/page-render';
import SessionLogin from '../../utils/session-login';
import '../container/dashboard-container';
import IncomeTransactionIdb from '../../data/idb/income-transactions';
import ExpenseTransactionIdb from '../../data/idb/expense-transaction-idb';
import { commaSeparateNumber } from '../../utils/number';
import renderCategoryElement from '../../utils/dashboard/render-category';
import TagihanItemIdb from '../../data/idb/tagihan-item-idb';
import RenderNotifications from '../../utils/notifications/render-notifications';
import FincordApi from '../../data/api/fincord-api';

const BerandaPage = {
  async render() {
    pageRender('beranda', 'app');
    return '<dashboard-container></dashboard-container>';
  },

  async afterRender() {
    SessionLogin();
    const currentElement = document.querySelector('#current');
    const incomeElement = document.querySelector('#income');
    const expenseElement = document.querySelector('#expense');
    const billDashboardElement = document.querySelector('bill-dashboard');

    const incomeTransaction = await IncomeTransactionIdb.getAllData();
    const expenseTransaction = await ExpenseTransactionIdb.getAllData();
    const sumIncome = incomeTransaction.reduce((accumulator, array) => accumulator + array.count, 0);
    const sumExpense = expenseTransaction.reduce((accumulator, array) => accumulator + array.count, 0);
    const dataBills = await TagihanItemIdb.getAllData();

    currentElement.textContent = `Rp. ${commaSeparateNumber(sumIncome - sumExpense)}`;
    incomeElement.textContent = `Rp. ${commaSeparateNumber(sumIncome)}`;
    expenseElement.textContent = `Rp. ${commaSeparateNumber(sumExpense)}`;

    renderCategoryElement(expenseTransaction);

    billDashboardElement.props = dataBills;

    RenderNotifications();
  },
};

export default BerandaPage;
