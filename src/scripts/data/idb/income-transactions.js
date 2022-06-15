import FincordAPI from '../fincord-api';
import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'income-transactions',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'income-transactions',
};

class IncomeTransactionIdb extends BaseIdb {
  // Melihat seluruh data kategori pengeluaran
  static async getAllData() {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    const dataIncomeTransaction = dataFromApi.data.transaksi.pemasukan.data;

    const dataFromIdb = await super.getDataDB(idDB);

    if (dataFromIdb.length === 0) {
      dataIncomeTransaction.forEach(async (item) => {
        const idCategory = item._id;

        item.data.forEach(async (transaction) => {
          const data = {
            _id: transaction._id,
            count: transaction.count,
            date: transaction.date,
            desc: transaction.description,
            idFK: idCategory,
          };

          await super.putDataDB(idDB, data);
        });
      });
    }

    document.querySelector('.loading-wrapper').classList.add('d-none');
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
  static async putData(income) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    // Data yang harus diterima income
    /**
     * {
     *  _id: 'asdfghj',
        count: 5000000,
        date: '2022-05-12',
        desc: '',
        idFK: 'msk1'
     * }
     */

    if (!income.hasOwnProperty('_id')) {
      return;
    }

    const result = await super.putDataDB(idDB, income);
    document.querySelector('.loading-wrapper').classList.add('d-none');
    return result;
  }

  // Menghapus kategori pengeluaran
  static async deleteData(id) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    const result = await super.deleteDataDB(idDB, id);
    document.querySelector('.loading-wrapper').classList.add('d-none');
    return result;
  }
}

export default IncomeTransactionIdb;
