import CONFIG from '../globals/config';

class FincordAPI {
  static async _sendRequest(url) {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      // if (responseJson.error) {
      //   throw new Error(responseJson.message);
      // } else {
      //   return responseJson;
      // }
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllData() {
    const data = await this._sendRequest(CONFIG.BASE_URL);
    return data[0];
  }
}

export default FincordAPI;
