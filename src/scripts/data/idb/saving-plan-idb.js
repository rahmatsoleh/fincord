import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'saving-plan',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'saving-plan',
};

class SavingPlanIdb extends BaseIdb {
  // Melihat seluruh data kategori saving
  static async getAllData() {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    // const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    // const dataSaving = dataFromApi.data.saving_plan.data;

    const dataFromIdb = await super.getDataDB(idDB);

    // if (dataFromIdb.length === 0) {
    //   dataSaving.forEach(async (item) => {
    //     const savingName = {
    //       _id: item._id,
    //       title: item.title,
    //       nominal: item.nominal,
    //       dateline: item.dateline,
    //     };

    //     await super.putDataDB(idDB, savingName);
    //   });
    // }

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

export default SavingPlanIdb;
