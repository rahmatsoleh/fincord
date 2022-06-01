import { openDB, deleteDB } from 'idb';
import CONFIG from '../../globals/config';

const { DATABASE_NAME, DATABASE_VERSION } = CONFIG;

// const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
//   upgrade(database) {
//     database.createObjectStore(OBJECT_STORE_NAME, { keyPath: '_id' });
//   },
// });

class BaseIdb {
  constructor(OBJECT_STORE_NAME) {
    this._OBJECT_STORE_NAME = OBJECT_STORE_NAME;
    this._DATABASE_NAME = DATABASE_NAME;
    this._DATABASE_VERSION = DATABASE_VERSION;
  }

  static async deleted() {
    await deleteDB(this._DATABASE_NAME);
  }

  // Melihat seluruh data
  static async getDataDB() {
    const objectStore = this._OBJECT_STORE_NAME;
    const db = await openDB(this._DATABASE_NAME, this._DATABASE_VERSION, {
      upgrade(db) {
        db.createObjectStore(objectStore, { keyPath: '_id' });
      },
    });

    return db.getAll(objectStore);
  }

  // Menambah dan Mengubah data
  static async putDataDB(data) {
    const objectStore = this._OBJECT_STORE_NAME;
    const db = await openDB(this._DATABASE_NAME, this._DATABASE_VERSION, {
      upgrade(db) {
        db.createObjectStore(objectStore, { keyPath: '_id' });
      },
    });

    return db.put(objectStore, data);
  }

  // Menghapus data
  static async deleteDataDB(id) {
    const objectStore = this._OBJECT_STORE_NAME;
    const db = await openDB(this._DATABASE_NAME, this._DATABASE_VERSION, {
      upgrade(db) {
        db.createObjectStore(objectStore, { keyPath: '_id' });
      },
    });

    return db.delete(objectStore, id);
  }
}

export default BaseIdb;
