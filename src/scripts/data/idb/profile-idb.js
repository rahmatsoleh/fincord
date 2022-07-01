import BaseIdb from './base-idb';

const idDB = {
  DATABASE_NAME: 'profile',
  DATABASE_VERSION: 1,
  OBJECT_STORE: 'profile',
};

class ProfileIdb extends BaseIdb {
  static async getAllData() {
    const dataFromIdb = await super.getDataDB(idDB);

    return dataFromIdb[0];
  }

  static async putData(profile) {
    if (!profile.hasOwnProperty('_id')) {
      return;
    }

    const result = await super.putDataDB(idDB, profile);
    return result;
  }
}

export default ProfileIdb;
