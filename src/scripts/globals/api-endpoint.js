import CONFIG from './config';

const API_ENDPOINT = {
  // Authentication
  register: `${CONFIG.URL}/register`,
  login: `${CONFIG.URL}/login`,

  // All Data
  getAllData: (idUser) => `${CONFIG.URL}/getalldata?id=${idUser}`,

  // Category
  addCategory: `${CONFIG.URL}/category`, // for add and delete
  updateCategory: `${CONFIG.URL}/category`,
  getCategory: (idCategory) => `${CONFIG.URL}/category?id=${idCategory}`,

  // Record or Transaction
  // getIncome: (userID) => `${CONFIG.URL}/getincome?id=${userID}`,
  // getExpense: (userID) => `${CONFIG.URL}/getexpense?id=${userID}`,
  storeIncome: `${CONFIG.URL}/storeincome`,
  storeExpense: `${CONFIG.URL}/storeexpense`,

  // Saving
  saving: `${CONFIG.URL}/saving`,
  // Saving Record
  savingRecord: `${CONFIG.URL}/savingrecord`,

  // Notifications
  notifications: `${CONFIG.URL}/notifications`,

  // Tagihan
  bill: `${CONFIG.URL}/bill`,
};

export default API_ENDPOINT;
