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
    document.querySelector('.loading-wrapper').classList.remove('d-none');
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
          paid: false,
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

export default TagihanItemIdb;
