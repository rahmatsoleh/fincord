import ExpenseCategoryIdb from '../../data/idb/expense-category-idb';

const renderCategoryElement = async (storage) => {
  const expenseCategory = await ExpenseCategoryIdb.getAllData();
  const monthNow = new Date().getMonth();
  const yearNow = new Date().getFullYear();
  const dataFromStorage = await storage;
  const dataMonthNow = [];

  dataFromStorage.forEach((item) => {
    const split = item.date.split('-');
    const yearItem = split[0];
    const monthItem = split[1];

    if (yearItem == yearNow) {
      if (parseInt(monthItem) >= parseInt(monthNow + 1)) {
        dataMonthNow.push({
          category: item.idFk || item.idFK,
          count: item.count,
        });
      }
    }
  });

  const sumDataCategory = [];
  dataMonthNow.reduce((res, value) => {
    if (!res[value.category]) {
      res[value.category] = { category: value.category, count: 0 };
      sumDataCategory.push(res[value.category]);
    }
    res[value.category].count += value.count;
    return res;
  }, {});

  const summaryData = [];
  sumDataCategory.forEach((sumData) => {
    expenseCategory.forEach((category) => {
      if (sumData.category == category._id) {
        summaryData.push({
          id: category._id,
          name: category.title,
          max: category.limited,
          use: sumData.count,
        });
      }
    });
  });

  const transactionDashboard = document.querySelector('transaktion-dashboard');
  transactionDashboard.props = summaryData;
};

export default renderCategoryElement;
