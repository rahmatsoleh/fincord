import CONFIG from './config';

const API_ENDPOINT = {
  register: `${CONFIG.URL}/register`,
  login: `${CONFIG.URL}/login`,
  getAllData: (idUser) => `${CONFIG.URL}/getalldata?id=${idUser}`,
  addCategory: `${CONFIG.URL}/category`,
  updateCategory: `${CONFIG.URL}/category`,
  getCategory: (idCategory) => `${CONFIG.URL}/category?id=${idCategory}`,
  storeIncome: `${CONFIG.URL}/storeincome`,
  storeExpense: `${CONFIG.URL}/storeexpense`,
  saving: `${CONFIG.URL}/saving`,
  savingRecord: `${CONFIG.URL}/savingrecord`,
  notifications: `${CONFIG.URL}/notifications`,
  bill: `${CONFIG.URL}/bill`,
};

export default API_ENDPOINT;
