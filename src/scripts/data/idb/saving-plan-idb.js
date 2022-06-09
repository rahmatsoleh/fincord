import FincordAPI from '../fincord-api';
import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'saving-plan',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'saving-plan',
};

class SavingPlanIdb extends BaseIdb {
  // Melihat seluruh data kategori saving
  static async getAllData() {
    const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    const dataSaving = dataFromApi.data.saving_plan.data;

    const dataFromIdb = await super.getDataDB(idDB);

    if (dataFromIdb.length === 0) {
      dataSaving.forEach(async (item) => {
        const savingName = {
          _id: item._id,
          title: item.title,
          nominal: item.nominal,
          dateline: item.dateline,
        };

        await super.putDataDB(idDB, savingName);
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

export default SavingPlanIdb;
