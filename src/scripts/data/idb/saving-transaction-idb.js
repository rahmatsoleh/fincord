import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'saving-transactions',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'saving-transactions',
};

class SavingTransactionIdb extends BaseIdb {
  // Melihat seluruh data transaction saving
  static async getAllData() {
    document.querySelector('.loading-wrapper').classList.remove('d-none');

    const dataFromIdb = await super.getDataDB(idDB);

    document.querySelector('.loading-wrapper').classList.add('d-none');
    return dataFromIdb;
  }

  static async putData(savings) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');

    if (!savings.hasOwnProperty('_id')) {
      return;
    }

    const result = await super.putDataDB(idDB, savings);
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

export default SavingTransactionIdb;
