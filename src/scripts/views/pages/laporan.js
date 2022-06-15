import ApexCharts from 'apexcharts';
import pageRender from '../../utils/page-render';
import '../container/report-container';
import weekData from '../../utils/report/week-data';
import UrlParser from '../../routes/url-parser';
import { commaSeparateNumber } from '../../utils/number';
import selectMonth from '../items/select-month';
import barOptions from '../../utils/report/bar-options';
import IncomeTransactionIdb from '../../data/idb/income-transactions';
import ExpenseTransactionIdb from '../../data/idb/expense-transaction-idb';
import selectYear from '../items/select-year';
import monthData from '../../utils/report/month-data';
import yearData from '../../utils/report/year-data';
import historyTransaction from '../../utils/report/history-transaction';
import renderHistoryList from '../items/render-history-list';

const LaporanPage = {
  async render() {
    pageRender('laporan', 'app');
    return '<report-container>Halaman Laporan</report-container>';
  },

  async afterRender() {
    // Data from idb
    const incomeTransaction = await IncomeTransactionIdb.getAllData();
    const expenseTransaction = await ExpenseTransactionIdb.getAllData();

    // Property
    const monthIndex = await UrlParser.parseActiveWithoutCombiner().id;
    const yearIndex = UrlParser.parseActiveWithoutCombiner().verb;
    const divChart = document.querySelector('#chart');
    const navBarMenu = document.querySelectorAll('nav ul li a');
    const buttonNavigations = document.querySelectorAll('section.report-nav button');
    const selectOptions = document.querySelector('section.report-grafik select');

    // Render Select option
    selectOptions.innerHTML = selectMonth(monthIndex);
    const monthText = selectOptions.options[selectOptions.selectedIndex].text;

    // Data transactions
    let income = weekData(monthIndex, yearIndex, incomeTransaction);
    let expense = weekData(monthIndex, yearIndex, expenseTransaction);

    // Bar Default
    let options = barOptions(income.category, expense.category, monthText);

    let chart = new ApexCharts(divChart, options);

    chart.render();

    // Summary Report
    document.querySelector('#income').textContent = `Rp. ${commaSeparateNumber(income.summary)}`;
    document.querySelector('#expense').textContent = `Rp. ${commaSeparateNumber(expense.summary)}`;
    document.querySelector('#remain').textContent = `Rp. ${commaSeparateNumber(income.summary - expense.summary)}`;

    // Render history
    const dataHistory = await historyTransaction(incomeTransaction, expenseTransaction, yearIndex, monthIndex);
    renderHistoryList(dataHistory);

    /**
     * { tag, category, count, date}
     */

    /* When select options changed */
    selectOptions.addEventListener('change', async () => {
      chart.destroy();
      const monthText = selectOptions.options[selectOptions.selectedIndex].text;
      income = weekData(selectOptions.value, yearIndex, incomeTransaction);
      expense = weekData(selectOptions.value, yearIndex, expenseTransaction);

      options = barOptions(income.category, expense.category, monthText);

      chart = new ApexCharts(divChart, options);

      chart.render();

      // Summary Report
      document.querySelector('#income').textContent = `Rp. ${commaSeparateNumber(income.summary)}`;
      document.querySelector('#expense').textContent = `Rp. ${commaSeparateNumber(expense.summary)}`;
      document.querySelector('#remain').textContent = `Rp. ${commaSeparateNumber(income.summary - expense.summary)}`;

      // Render history
      const dataHistory = await historyTransaction(incomeTransaction, expenseTransaction, yearIndex, selectOptions.value);
      renderHistoryList(dataHistory);
    });

    /*
      * When move to Mingguan button navigations
    */
    const weekButton = document.querySelector('section.report-nav button[data-nav="week"]');
    weekButton.addEventListener('click', async () => {
      buttonNavigations.forEach((element) => {
        element.classList.remove('active');

        if (element.dataset.nav === weekButton.dataset.nav) element.classList.add('active');
      });

      // Render Select option
      selectOptions.disabled = false;
      selectOptions.innerHTML = selectMonth(monthIndex);
      const monthText = selectOptions.options[selectOptions.selectedIndex].text;

      // Data transactions
      let income = weekData(monthIndex, yearIndex, await incomeTransaction);
      let expense = weekData(monthIndex, yearIndex, await expenseTransaction);

      // Bar Default
      let options = barOptions(income.category, expense.category, monthText);

      chart.destroy();
      chart = new ApexCharts(divChart, options);

      chart.render();

      // Summary Report
      document.querySelector('#income').textContent = `Rp. ${commaSeparateNumber(income.summary)}`;
      document.querySelector('#expense').textContent = `Rp. ${commaSeparateNumber(expense.summary)}`;
      document.querySelector('#remain').textContent = `Rp. ${commaSeparateNumber(income.summary - expense.summary)}`;

      // Render history
      const dataHistory = await historyTransaction(incomeTransaction, expenseTransaction, yearIndex, monthIndex);
      renderHistoryList(dataHistory);

      // When select options changed
      selectOptions.addEventListener('change', async () => {
        const monthText = selectOptions.options[selectOptions.selectedIndex].text;
        income = weekData(selectOptions.value, yearIndex, await incomeTransaction);
        expense = weekData(selectOptions.value, yearIndex, await expenseTransaction);

        options = barOptions(income.category, expense.category, monthText);

        chart.destroy();
        chart = new ApexCharts(divChart, options);

        chart.render();

        // Summary Report
        document.querySelector('#income').textContent = `Rp. ${commaSeparateNumber(income.summary)}`;
        document.querySelector('#expense').textContent = `Rp. ${commaSeparateNumber(expense.summary)}`;
        document.querySelector('#remain').textContent = `Rp. ${commaSeparateNumber(income.summary - expense.summary)}`;

        // Render history
        const dataHistory = await historyTransaction(incomeTransaction, expenseTransaction, yearIndex, selectOptions.value);
        renderHistoryList(dataHistory);
      });
    });

    /*
      * When move to Bulanan button navigations
    */
    const monthButton = document.querySelector('section.report-nav button[data-nav="month"]');
    monthButton.addEventListener('click', async () => {
      buttonNavigations.forEach((element) => {
        element.classList.remove('active');

        if (element.dataset.nav === monthButton.dataset.nav) element.classList.add('active');
      });
      selectOptions.disabled = false;
      selectOptions.innerHTML = selectYear();

      // Render Bar Bulanan
      income = monthData(await incomeTransaction, selectOptions.value);
      expense = monthData(await expenseTransaction, selectOptions.value);

      options = barOptions(income.category, expense.category, 'Tahun', selectOptions.value);

      // Mengganti tipe line
      options.chart.type = 'line';

      chart.destroy();
      chart = new ApexCharts(divChart, options);

      chart.render();

      // Summary Report Bulanan
      document.querySelector('#income').textContent = `Rp. ${commaSeparateNumber(income.summary)}`;
      document.querySelector('#expense').textContent = `Rp. ${commaSeparateNumber(expense.summary)}`;
      document.querySelector('#remain').textContent = `Rp. ${commaSeparateNumber(income.summary - expense.summary)}`;

      // Render history
      const dataHistory = await historyTransaction(incomeTransaction, expenseTransaction, selectOptions.value);
      renderHistoryList(dataHistory);

      // Change select options
      selectOptions.addEventListener('change', async () => {
        income = monthData(await incomeTransaction, selectOptions.value);
        expense = monthData(await expenseTransaction, selectOptions.value);

        options = barOptions(income.category, expense.category, 'Tahun', selectOptions.value);
        // Mengganti tipe line
        options.chart.type = 'line';

        chart.destroy();
        chart = new ApexCharts(divChart, options);

        chart.render();

        // Summary Report Bulanan
        document.querySelector('#income').textContent = `Rp. ${commaSeparateNumber(income.summary)}`;
        document.querySelector('#expense').textContent = `Rp. ${commaSeparateNumber(expense.summary)}`;
        document.querySelector('#remain').textContent = `Rp. ${commaSeparateNumber(income.summary - expense.summary)}`;

        // Render history
        const dataHistory = await historyTransaction(incomeTransaction, expenseTransaction, selectOptions.value);
        renderHistoryList(dataHistory);
      });
    });

    /*
      * When move to Tahunan button navigations
    */
    const yearButton = document.querySelector('section.report-nav button[data-nav="year"]');
    yearButton.addEventListener('click', async () => {
      buttonNavigations.forEach((element) => {
        element.classList.remove('active');

        if (element.dataset.nav === yearButton.dataset.nav) element.classList.add('active');
      });

      selectOptions.disabled = true;
      selectOptions.innerHTML = '<option>- Semua -</option>';

      // Render Bar Bulanan
      income = yearData(await incomeTransaction);
      expense = yearData(await expenseTransaction);

      options = barOptions(income.category, expense.category, '', 'Seluruh Transaksi');

      chart.destroy();
      chart = new ApexCharts(divChart, options);

      chart.render();

      // Summary Report Bulanan
      document.querySelector('#income').textContent = `Rp. ${commaSeparateNumber(income.summary)}`;
      document.querySelector('#expense').textContent = `Rp. ${commaSeparateNumber(expense.summary)}`;
      document.querySelector('#remain').textContent = `Rp. ${commaSeparateNumber(income.summary - expense.summary)}`;

      // Render history
      const dataHistory = await historyTransaction(incomeTransaction, expenseTransaction);
      renderHistoryList(dataHistory);
    });

    navBarMenu.forEach((element) => {
      element.addEventListener('click', () => {
        if (!element.parentElement.classList.contains('active')) chart.destroy();
      });
    });
  },
};

export default LaporanPage;
