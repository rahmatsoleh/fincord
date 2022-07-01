import moment from 'moment';

const monthData = (storage, year = new Date().getFullYear()) => {
  const dataCollections = [];
  let summary = 0;
  const yearNow = new Date().getFullYear();
  const monthIndexNow = yearNow == year ? new Date().getMonth() : 11;

  for (let i = 0; i <= monthIndexNow; i++) {
    const result = {
      x: moment.monthsShort(i),
      y: 0,
    };

    storage.forEach((item) => {
      const split = item.date.split('-');
      const getMonthData = split[1];
      const getYearData = split[0];

      if (year == getYearData) {
        if (getMonthData == i + 1) result.y += item.count;
      }
    });

    dataCollections.push(result);
  }

  dataCollections.forEach((item) => summary += item.y);

  return {
    category: dataCollections,
    summary,
  };
};

export default monthData;
