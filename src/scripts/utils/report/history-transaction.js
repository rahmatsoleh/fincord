import moment from 'moment';
import IncomeCategoryIdb from '../../data/idb/income-category-idb';
import ExpenseCategoryIdb from '../../data/idb/expense-category-idb';
import { commaSeparateNumber } from '../number';

const historyTransaction = async (income, expense, year, monthNumber) => {
  const dataCollection = [];
  const incomeCategory = await IncomeCategoryIdb.getAllData();
  const expenseCategory = await ExpenseCategoryIdb.getAllData();

  income.forEach((item) => {
    const split = item.date.split('-');
    const yearItem = split[0];
    const monthItem = split[1];

    if (year == yearItem) {
      if (monthNumber) {
        if (parseInt(monthNumber) == parseInt(monthItem)) {
          const result = {
            tag: 'in',
            category: item.idFk || item.idFK,
            count: commaSeparateNumber(item.count),
            date: item.date,
          };
          dataCollection.push(result);
        }
      } else {
        const result = {
          tag: 'in',
          category: item.idFk || item.idFK,
          count: commaSeparateNumber(item.count),
          date: item.date,
        };

        dataCollection.push(result);
      }
    } else {
      const yearNow = new Date().getFullYear();

      for (let i = 0; i < 5; i++) {
        if (yearNow + i == yearItem) {
          const result = {
            tag: 'in',
            category: item.idFk || item.idFK,
            count: commaSeparateNumber(item.count),
            date: item.date,
          };

          dataCollection.push(result);
        }
      }
    }
  });

  expense.forEach((item) => {
    const split = item.date.split('-');
    const yearItem = split[0];
    const monthItem = split[1];

    if (year == yearItem) {
      if (monthNumber) {
        if (parseInt(monthNumber) == parseInt(monthItem)) {
          const result = {
            tag: 'out',
            category: item.idFk || item.idFK,
            count: commaSeparateNumber(item.count),
            date: item.date,
          };

          dataCollection.push(result);
        }
      } else {
        const result = {
          tag: 'out',
          category: item.idFk || item.idFK,
          count: commaSeparateNumber(item.count),
          date: item.date,
        };

        dataCollection.push(result);
      }
    } else {
      const yearNow = new Date().getFullYear();

      for (let i = 0; i < 5; i++) {
        if (yearNow + i == yearItem) {
          const result = {
            tag: 'out',
            category: item.idFk || item.idFK,
            count: commaSeparateNumber(item.count),
            date: item.date,
          };

          dataCollection.push(result);
        }
      }
    }
  });

  dataCollection.forEach((item) => {
    incomeCategory.forEach((income) => {
      if (item.category == income._id) item.category = income.title;
    });

    expenseCategory.forEach((expense) => {
      if (item.category == expense._id) item.category = expense.title;
    });
  });

  dataCollection.sort((a, b) => moment(a.date, 'YYYY-MM-DD').isBefore(moment(b.date, 'YYYY-MM-DD')) ? 1 : -1);
  return dataCollection;
};

export default historyTransaction;
