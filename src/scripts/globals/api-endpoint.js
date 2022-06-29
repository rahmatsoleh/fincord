import CONFIG from './config';

const API_ENDPOINT = {
  register: `${CONFIG.URL}/register`,
  login: `${CONFIG.URL}/login`,
  getAllData: (idUser) => `${CONFIG.URL}/getalldata?id=${idUser}`,
  addCategory: `${CONFIG.URL}/category`,
  notifications: `${CONFIG.URL}/notifications`,
};

export default API_ENDPOINT;
