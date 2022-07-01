import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'income-category',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'income-category',
};

class IncomeCategoryIdb extends BaseIdb {
  static async getAllData() {
    document.querySelector('.loading-wrapper').classList.remove('d-none');

    const dataFromIdb = await super.getDataDB(idDB);

    document.querySelector('.loading-wrapper').classList.add('d-none');
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

export default IncomeCategoryIdb;
