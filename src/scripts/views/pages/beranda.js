import pageRender from '../../utils/page-render';
import '../container/dashboard-container';
import IncomeTransactionIdb from '../../data/idb/income-transactions';
import ExpenseTransactionIdb from '../../data/idb/expense-transaction-idb';
import { commaSeparateNumber } from '../../utils/number';
import renderCategoryElement from '../../utils/dashboard/render-category';
import TagihanItemIdb from '../../data/idb/tagihan-item-idb';

const BerandaPage = {
  async render() {
    pageRender('beranda', 'app');
    return '<dashboard-container></dashboard-container>';
  },

  async afterRender() {
    // request all data from api
    // const dataAll = await new Promise((resolve, reject) => {
    // fetch(`http://localhost:3000/api/getalldata?id=${JSON.parse(localStorage.getItem('data')).id}`);
    //   const xhr = new XMLHttpRequest();
    //   xhr.open('GET', `http://localhost:3000/api/getalldata?id=${JSON.parse(localStorage.getItem('data')).id}`);
    //   xhr.setRequestHeader('Content-Type', 'application/json');
    //   xhr.setRequestHeader('x-token', JSON.parse(localStorage.getItem('data')).token);
    //   xhr.send();
    //   xhr.onload = () => {
    //     if (xhr.status === 200) {
    //       resolve(JSON.parse(xhr.responseText));
    //     } else {
    //       reject(xhr.status);
    //     }
    //   };
    // }).catch((err) => {
    //   console.log(err);
    // });

    // {{ save data to idb }}

    // Variable component
    const currentElement = document.querySelector('#current');
    const incomeElement = document.querySelector('#income');
    const expenseElement = document.querySelector('#expense');
    const billDashboardElement = document.querySelector('bill-dashboard');

    // Variable Data
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
  },
};

export default BerandaPage;
