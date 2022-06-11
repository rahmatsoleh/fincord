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

    return dataFromIdb;
  }

  // Menambahkan dan Mengubah data
  static async putData(plan) {
    if (!plan.hasOwnProperty('_id')) {
      return;
    }

    return super.putDataDB(idDB, plan);
  }

  // Menghapus kategori pemasukan
  static async deleteData(id) {
    return super.deleteDataDB(idDB, id);
  }
}

export default TagihanHistory;
