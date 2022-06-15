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
    document.querySelector('.loading-wrapper').classList.remove('d-none');
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

    document.querySelector('.loading-wrapper').classList.add('d-none');
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
    document.querySelector('.loading-wrapper').classList.remove('d-none');
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

    const result = await super.putDataDB(idDB, bills);
    document.querySelector('.loading-wrapper').classList.add('d-none');
    return result;
  }

  // Menghapus kategori bilss
  static async deleteData(id) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    const result = await super.deleteDataDB(idDB, id);

    document.querySelector('.loading-wrapper').classList.add('d-none');
    return result;
  }
}

export default BillsCategoryIdb;
