import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'income-transactions',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'income-transactions',
};

class IncomeTransactionIdb extends BaseIdb {
  static async getAllData() {
    document.querySelector('.loading-wrapper').classList.remove('d-none');

    const dataFromIdb = await super.getDataDB(idDB);

    document.querySelector('.loading-wrapper').classList.add('d-none');
    return dataFromIdb;
  }

  static async putData(income) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');

    if (!income.hasOwnProperty('_id')) {
      return;
    }

    const result = await super.putDataDB(idDB, income);
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

export default IncomeTransactionIdb;
