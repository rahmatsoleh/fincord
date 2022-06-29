import moment from 'moment';
import API_ENDPOINT from '../../globals/api-endpoint';
import IncomeCategoryIdb from '../idb/income-category-idb';
import ExpenseCategoryIdb from '../idb/expense-category-idb';
import NotificationsIdb from '../idb/notifications-idb';
import defaultCategory from '../client';

class FincordApi {
  static async getAllData(idUser) {
    try {
      const response = await fetch(API_ENDPOINT.getAllData(idUser));
      const allData = await response.json();
      const dataCategory = allData.data.categories;
      const notification = allData.data.notifications;
      const dataStoreIncome = allData.data.transaksi.pemasukan.data;

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

      // Input To Notification
      notification.forEach(async (data) => {
        const item = {
          _id: data.id,
          idFK: data.bill,
          title: data.name,
          tag: data.tag,
          date: moment.utc(data.date).format('YYYY-MM-DD'),
          dateline: moment.utc(data.dateline).format('YYYY-MM-DD'),
          desc: data.description,
          read: data.is_reading > 0,
        };
        await NotificationsIdb.putData(item);
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async manageCategory(method, dataItem) {
    const response = await fetch(API_ENDPOINT.addCategory, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataItem),
    });
    const responseJson = response.json();
    return responseJson;
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
