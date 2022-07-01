import moment from 'moment';
import Swal from 'sweetalert2';
import API_ENDPOINT from '../../globals/api-endpoint';
import IncomeCategoryIdb from '../idb/income-category-idb';
import ExpenseCategoryIdb from '../idb/expense-category-idb';
import NotificationsIdb from '../idb/notifications-idb';
import IncomeTransactionIdb from '../idb/income-transactions';
import ExpenseTransactionIdb from '../idb/expense-transaction-idb';
import SavingPlanIdb from '../idb/saving-plan-idb';
import SavingTransactionIdb from '../idb/saving-transaction-idb';
import ProfileIdb from '../idb/profile-idb';
import TagihanItemIdb from '../idb/tagihan-item-idb';
import defaultCategory from '../client';

class FincordApi {
  static async getAllData(idUser) {
    try {
      document.querySelector('.loading-wrapper').classList.remove('d-none');
      const response = await fetch(API_ENDPOINT.getAllData(idUser));
      const allData = await response.json();
      const dataCategory = allData.data.categories;
      const notification = allData.data.notifications;
      const dataStoreIncome = allData.data.transaksi.pemasukan.data;
      const dataStoreExpense = allData.data.transaksi.pengeluaran.data;
      const savingPlan = allData.data.savings;
      const savingRecord = allData.data.saving_record;
      const { bills } = allData.data;

      // Insert Profile to ProfileIdb
      await ProfileIdb.putData({
        _id: allData._id,
        email: allData.email,
        username: allData.username,
        name: allData.name,
      });

      // Jika Data Category Kosong maka buatkan kategory
      if (dataCategory.length > 0) {
        const incomeCategoryFromApi = dataCategory.filter((item) => item.type === 'income');
        const expenseCategoryFromApi = dataCategory.filter((item) => item.type === 'expense');

        incomeCategoryFromApi.forEach(async (item) => {
          await IncomeCategoryIdb.putData({
            _id: item.id,
            title: item.name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        });

        expenseCategoryFromApi.forEach(async (item) => {
          await ExpenseCategoryIdb.putData({
            _id: item.id,
            title: item.name,
            limited: item.limited,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        });
      } else {
        defaultCategory(idUser).forEach(async (item) => {
          if (item.type === 'income') {
            await IncomeCategoryIdb.putData({
              _id: item.id,
              title: item.name,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }

          if (item.type === 'expense') {
            await ExpenseCategoryIdb.putData({
              _id: item.id,
              title: item.name,
              limited: item.limited,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }

          await this.manageCategory('POST', item);
        });
      }

      // Input Transaction
      dataStoreIncome.forEach(async (income) => {
        await IncomeTransactionIdb.putData({
          _id: income.id,
          count: income.amount,
          date: moment.utc(income.date).format('YYYY-MM-DD'),
          desc: income.note,
          idFK: income.category_id,
        });
      });

      dataStoreExpense.forEach(async (expense) => {
        await ExpenseTransactionIdb.putData({
          _id: expense.id,
          count: expense.amount,
          date: moment.utc(expense.date).format('YYYY-MM-DD'),
          desc: expense.note,
          idFK: expense.category_id,
        });
      });

      // Input Saving Plan
      savingPlan.forEach(async (saving) => {
        await SavingPlanIdb.putData({
          _id: saving.id,
          title: saving.name,
          nominal: saving.goal_amount,
          dateline: moment.utc(saving.due_date).format('YYYY-MM-DD'),
        });
      });

      // Inpu Saving Transaction
      savingRecord.forEach(async (record) => {
        await SavingTransactionIdb.putData({
          _id: record.id,
          date: moment.utc(record.date).format('YYYY-MM-DD'),
          save: parseInt(record.save),
          idFK: record.saving_plan_id,
        });
      });

      // Input To Bill
      bills.forEach(async (bill) => {
        await TagihanItemIdb.putData({
          _id: bill.id,
          name: bill.name,
          payment: parseInt(bill.payment),
          date: moment.utc(bill.date).format('YYYY-MM-DD'),
          remember: bill.reminder > 0,
          paid: bill.status_paid > 0,
        });
      });
      document.querySelector('.loading-wrapper').classList.add('d-none');
    } catch (error) {
      document.querySelector('.loading-wrapper').classList.add('d-none');
      Swal.fire('Uppss...', error.message, 'warning');
    }
  }

  static async manageCategory(method, dataItem) {
    const checkAvailability = await fetch(API_ENDPOINT.getCategory(dataItem.id), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then((response) => response.json())
      .catch((error) => console.log(error));
    let response = '';
    if (checkAvailability.data.id === dataItem.id) {
      response = await this.updateCategory(dataItem);
    } else {
      response = await fetch(API_ENDPOINT.addCategory, {
        method,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(dataItem),
      });
    }
    // const responseJson = response.json();
    return response;
  }

  static async updateCategory(dataItem) {
    const response = await fetch(API_ENDPOINT.updateCategory, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(dataItem),
    });
    return response;
  }

  static async manageNotification(method, dataBody) {
    const response = await fetch(API_ENDPOINT.notifications, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataBody),
    });
    const responseJson = response.json();
    return responseJson;
  }
}

export default FincordApi;
