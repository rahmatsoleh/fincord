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

    return super.putDataDB(idDB, notif);
  }

  // Menghapus kategori notif
  static async deleteData(id) {
    return super.deleteDataDB(idDB, id);
  }
}

export default NotificationsIdb;
