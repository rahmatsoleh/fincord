import API_ENDPOINT from '../../globals/api-endpoint';
import IncomeCategoryIdb from '../idb/income-category-idb';
import ExpenseCategoryIdb from '../idb/expense-category-idb';
import defaultCategory from '../client';

class FincordApi {
  static async getAllData(idUser) {
    try {
      const response = await fetch(API_ENDPOINT.getAllData(idUser));
      const allData = await response.json();
      const dataCategory = allData.data.categories;

      // Jika Data Category Kosong maka buatkan kategory
      if (dataCategory.length > 0) {
        const incomeCategoryFromApi = dataCategory.filter((item) => item.type === 'income');
        const expenseCategoryFromApi = dataCategory.filter((item) => item.type === 'expense');
        console.log(incomeCategoryFromApi, expenseCategoryFromApi);
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

          await this.addCategory(item);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async addCategory(dataItem) {
    const response = await fetch(API_ENDPOINT.addCategory, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataItem),
    });
    const responseJson = response.json();
    return responseJson;
  }
}

export default FincordApi;
