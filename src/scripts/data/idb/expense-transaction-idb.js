import FincordAPI from '../fincord-api';
import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'expense-transactions',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'expense-transactions',
};

class ExpenseTransactionIdb extends BaseIdb {
  // Melihat seluruh data kategori pengeluaran
  static async getAllData() {
    const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    const dataIncomeTransaction = dataFromApi.data.transaksi.pengeluaran.data;

    const dataFromIdb = await super.getDataDB(idDB);

    if (dataFromIdb.length === 0) {
      dataIncomeTransaction.forEach(async (item) => {
        const idCategory = item._id;

        item.data.forEach(async (transaction) => {
          const data = {
            _id: transaction._id,
            count: transaction.count,
            date: transaction.date,
            desc: transaction.desc,
            idFK: idCategory,
          };

          await super.putDataDB(idDB, data);
        });
      });
    }

    return dataFromIdb;
    // output
    /**
    [
      {_id: 'asdfghj',
        count: 5000000,
        date: '2022-05-12',
        desc: '',
        idFK: 'msk1'
      }
    ]
    */
  }

  // Menambahkan dan Mengubah data
  static async putData(expense) {
    // Data yang harus diterima expense
    /**
     * {
     *  _id: 'asdfghj',
        count: 5000000,
        date: '2022-05-12',
        desc: '',
        idFK: 'msk1'
     * }
     */

    if (!expense.hasOwnProperty('_id')) {
      return;
    }

    return super.putDataDB(idDB, expense);
  }

  // Menghapus kategori pengeluaran
  static async deleteData(id) {
    return super.deleteDataDB(idDB, id);
  }
}

export default ExpenseTransactionIdb;
