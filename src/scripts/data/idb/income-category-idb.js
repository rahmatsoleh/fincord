import FincordAPI from '../fincord-api';
import BaseIdb from './base-idb';

class IncomeCategoryIdb extends BaseIdb {
  constructor() {
    super('income-category');
  }

  // Melihat seluruh data kategori pemasukan
  static async getAllData() {
    const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    const dataIncome = dataFromApi.data.transaksi.pemasukan.data;

    const dataFromIdb = await super.getDataDB();

    if (dataFromIdb.length === 0) {
      dataIncome.forEach(async (item) => {
        const categoryData = {
          _id: item._id,
          created_at: item.created_at,
          updated_at: item.updated_at,
          title: item.title,
        };

        await super.putDataDB(categoryData);
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

    return super.putDataDB(category);
  }

  // Menghapus kategori pemasukan
  static async deleteData(id) {
    return super.deleteDataDB(id);
  }

  static async deleteDB() {
    return super.deleted();
  }
}

export default IncomeCategoryIdb;
