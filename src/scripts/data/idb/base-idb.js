import { openDB } from 'idb';

class BaseIdb {
  static async getDataDB(idDB) {
    const db = await openDB(idDB.DATABASE_NAME, idDB.DATABASE_VERSION, {
      upgrade(db) {
        db.createObjectStore(idDB.OBJECT_STORE, { keyPath: '_id' });
      },
    });

    return db.getAll(idDB.OBJECT_STORE);
  }

  static async putDataDB(idDB, data) {
    const db = await openDB(idDB.DATABASE_NAME, idDB.DATABASE_VERSION, {
      upgrade(db) {
        db.createObjectStore(idDB.OBJECT_STORE, { keyPath: '_id' });
      },
    });

    return db.put(idDB.OBJECT_STORE, data);
  }

  static async deleteDataDB(idDB, id) {
    const db = await openDB(idDB.DATABASE_NAME, idDB.DATABASE_VERSION, {
      upgrade(db) {
        db.createObjectStore(idDB.OBJECT_STORE, { keyPath: '_id' });
      },
    });

    return db.delete(idDB.OBJECT_STORE, id);
  }
}

export default BaseIdb;
