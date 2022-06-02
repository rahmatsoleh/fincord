import FincordAPI from '../fincord-api';
import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'bills-category',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'bills-category',
};

class BillsCategoryIdb extends BaseIdb {
  // Melihat seluruh data kategori bills
  static async getAllData() {
    const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    const dataSaving = dataFromApi.data.bills.data;

    const dataFromIdb = await super.getDataDB(idDB);

    if (dataFromIdb.length === 0) {
      dataSaving.forEach(async (item) => {
        const billsName = {
          _id: item._id,
          created_at: item.created_at,
          updated_at: item.updated_at,
          name: item.name,
          payment: item.payment,
          date: item.date,
          remember: item.remember,
          rememberBefore: item.rememberBefore,
          rememberTime: item.rememberTime,
        };

        await super.putDataDB(idDB, billsName);
      });
    }

    return dataFromIdb;

    // output
    /**
    [
      { _id: ,
        created_at: ,
        updated_at: ,
        name: ,
        payment: ,
        date: ,
        remember: ,
        rememberBefore: ,
        rememberTime: ,
      }
    ]
    */
  }

  // Menambahkan dan Mengubah data
  static async putData(bills) {
    // Data yang harus diterima bills
    /**
     * { _id: ,
        created_at: ,
        updated_at: ,
        name: ,
        payment: ,
        date: ,
        remember: ,
        rememberBefore: ,
        rememberTime: ,
      }
     */

    if (!bills.hasOwnProperty('_id')) {
      return;
    }

    return super.putDataDB(idDB, bills);
  }

  // Menghapus kategori bilss
  static async deleteData(id) {
    return super.deleteDataDB(idDB, id);
  }
}

export default BillsCategoryIdb;
