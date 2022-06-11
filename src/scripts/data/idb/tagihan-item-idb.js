import FincordAPI from '../fincord-api';
import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'tagihan-plan',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'tagihan-plan',
};

class TagihanItemIdb extends BaseIdb {
  // Melihat seluruh data kategori saving
  static async getAllData() {
    const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    const dataTagihan = dataFromApi.data.bills.data;

    const dataFromIdb = await super.getDataDB(idDB);

    if (dataFromIdb.length === 0) {
      dataTagihan.forEach(async (item) => {
        const tagihanItem = {
          _id: item._id,
          name: item.name,
          payment: item.payment,
          date: item.date,
          remember: item.remember,
          rememberBefore: item.remember_before,
          rememberTime: item.rememberTime,
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

export default TagihanItemIdb;
