import FincordAPI from '../fincord-api';
import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'notifications',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'notifications',
};

class NotificationsIdb extends BaseIdb {
  // Melihat seluruh data Notifications
  static async getAllData() {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    const dataFromApi = await FincordAPI.getAllData();

    // Cek terlebih dahulu properti yang dimiliki
    const dataNotif = dataFromApi.data.notifications.data;

    const dataFromIdb = await super.getDataDB(idDB);

    if (dataFromIdb.length === 0) {
      dataNotif.forEach(async (item) => {
        const notifName = {
          _id: item._id,
          tag: item.tag,
          name: item.name,
          date: item.date,
          link: item.link,
          desc: item.desc,
          isReading: item.is_reading,
        };

        await super.putDataDB(idDB, notifName);
      });
    }

    document.querySelector('.loading-wrapper').classList.add('d-none');
    return dataFromIdb;

    // output
    /**
    [
      {  _id: ,
        tag: ,
        name: ,
        date: ,
        link: ,
        desc: ,
        isReading: ,
      }
    ]
    */
  }

  // Menambahkan dan Mengubah data
  static async putData(notif) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    // Data yang harus diterima notif
    /**
     * {  _id: ,
        tag: ,
        name: ,
        date: ,
        link: ,
        desc: ,
        isReading: ,
      }
     */

    if (!notif.hasOwnProperty('_id')) {
      return;
    }

    const result = await super.putDataDB(idDB, notif);
    document.querySelector('.loading-wrapper').classList.add('d-none');
    return result;
  }

  // Menghapus kategori notif
  static async deleteData(id) {
    document.querySelector('.loading-wrapper').classList.remove('d-none');
    const result = await super.deleteDataDB(idDB, id);
    document.querySelector('.loading-wrapper').classList.add('d-none');
    return result;
  }
}

export default NotificationsIdb;
