import FincordAPI from '../fincord-api';
import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'saving-transactions',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'saving-transactions',
};

class SavingTransactionIdb extends BaseIdb {
  // Melihat seluruh data transaction saving
  static async getAllData() {
    const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    const dataSavingTransaction = dataFromApi.data.saving_plan.data;

    const dataFromIdb = await super.getDataDB(idDB);

    if (dataFromIdb.length === 0) {
      dataSavingTransaction.forEach(async (item) => {
        const idCategory = item._id;

        item.history.forEach(async (transaction) => {
          const data = {
            _id: transaction._id,
            date: transaction.date,
            save: transaction.save,
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
        date: '2022-05-12',
        save: 50000,
        idFK: 'msk1'
      }
    ]
    */
  }

  // Menambahkan dan Mengubah data
  static async putData(savings) {
    // Data yang harus diterima savings
    /**
     * {  _id: 'asdfghj',
          date: '2022-05-12',
          save: 50000,
          idFK: 'msk1'
        }
     */

    if (!savings.hasOwnProperty('_id')) {
      return;
    }

    return super.putDataDB(idDB, savings);
  }

  // Menghapus kategori pengeluaran
  static async deleteData(id) {
    return super.deleteDataDB(idDB, id);
  }
}

export default SavingTransactionIdb;
