import FincordAPI from '../fincord-api';
import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'income-category',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'income-category',
};

class IncomeCategoryIdb extends BaseIdb {
  // Melihat seluruh data kategori pemasukan
  static async getAllData() {
    const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    const dataIncome = dataFromApi.data.transaksi.pemasukan.data;

    const dataFromIdb = await super.getDataDB(idDB);

    if (dataFromIdb.length === 0) {
      dataIncome.forEach(async (item) => {
        const categoryData = {
          _id: item._id,
          created_at: item.created_at,
          updated_at: item.updated_at,
          title: item.title,
        };

        await super.putDataDB(idDB, categoryData);
      });
    }

    return dataFromIdb;

    // output
    /**
    [
      {_id: 'msk1',
        created_at: '2022-05-12T12:00:00-06:30', updated_at: '2022-05-12T12:00:00-06:30', title: 'Gaji'
      }
    ]
    */
  }

  // Menambahkan dan Mengubah data
  static async putData(category) {
    // Data yang harus diterima category
    /**
     * {
     *  _id,
     *  created_at,
     *  updated_at,
     *  title,
     * }
     */

    if (!category.hasOwnProperty('_id')) {
      return;
    }

    return super.putDataDB(idDB, category);
  }

  // Menghapus kategori pemasukan
  static async deleteData(id) {
    return super.deleteDataDB(idDB, id);
  }
}

export default IncomeCategoryIdb;
