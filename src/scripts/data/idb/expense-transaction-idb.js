import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'expense-transactions',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'expense-transactions',
};

class ExpenseTransactionIdb extends BaseIdb {
  static async getAllData() {
    const dataFromIdb = await super.getDataDB(idDB);

    return dataFromIdb;
  }

  static async putData(expense) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');

    if (!expense.hasOwnProperty('_id')) {
      return;
    }

    const result = await super.putDataDB(idDB, expense);
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

export default ExpenseTransactionIdb;
