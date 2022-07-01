import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'expense-category',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'expense-category',
};

class ExpenseCategoryIdb extends BaseIdb {
  static async getAllData() {
    const dataFromIdb = await super.getDataDB(idDB);

    return dataFromIdb;
  }

  static async putData(category) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');

    if (!category.hasOwnProperty('_id')) {
      return;
    }

    const result = await super.putDataDB(idDB, category);
    document.querySelector('.loading-wrapper').classList.add('d-none');
    return result;
  }

  static async deleteData(id) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    const result = await super.deleteDataDB(idDB, id);
    document.querySelector('.loading-wrapper').classList.add('d-none');

    return result;
  }
}

export default ExpenseCategoryIdb;
