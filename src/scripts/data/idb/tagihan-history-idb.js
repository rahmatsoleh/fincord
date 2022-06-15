import FincordAPI from '../fincord-api';
import BaseIdb from './base-idb';
import ExpenseTransactionIdb from './expense-transaction-idb';

const idDB = {
  DATABASE_NAME: 'tagihan-history',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'tagihan-history',
};

class TagihanHistory extends BaseIdb {
  // Melihat seluruh data kategori saving
  static async getAllData() {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    let dataTagihanHistory;
    const dataExpense = await ExpenseTransactionIdb.getAllData();
    dataExpense.forEach((element) => {
      if (element.title === 'Tagihan') {
        dataTagihanHistory = element.data;
      }
    });

    const dataFromIdb = await super.getDataDB(idDB);

    if (dataFromIdb.length === 0) {
      dataTagihanHistory.forEach(async (item) => {
        const tagihanItem = {
          _id: item._id,
          idTagihan: item.idTagihan,
          nominal: item.nominal,
          date: item.date,
        };

        await super.putDataDB(idDB, tagihanItem);
      });
    }

    document.querySelector('.loading-wrapper').classList.add('d-none');
    return dataFromIdb;
  }

  // Menambahkan dan Mengubah data
  static async putData(plan) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    if (!plan.hasOwnProperty('_id')) {
      return;
    }

    const result = await super.putDataDB(idDB, plan);
    document.querySelector('.loading-wrapper').classList.add('d-none');
    return result;
  }

  // Menghapus kategori pemasukan
  static async deleteData(id) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    const result = await super.deleteDataDB(idDB, id);
    document.querySelector('.loading-wrapper').classList.add('d-none');
    return result;
  }
}

export default TagihanHistory;
