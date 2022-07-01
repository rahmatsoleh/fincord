import moment from 'moment';

const weekData = (monthIndex, year, storage) => {
  const getWeekNumber = (year, month) => {
    let firstWeek = moment(new Date(year, month, 1)).isoWeek();
    const lastWeek = moment(new Date(year, month + 1, 0)).isoWeek();

    const out = [`Week ${firstWeek}`];
    if (firstWeek === 52 || firstWeek === 53) firstWeek = 0;

    for (let i = firstWeek + 1; i <= lastWeek; i++) {
      out.push(`Week ${i}`);
    }

    return out;
  };

  const getMomentDate = (start, end) => ({
    startDate: moment([year, monthIndex - 1, start]),
    endDate: moment([year, monthIndex - 1, end]),
  });

  const weeks = (month) => {
    const weekStartEndDay = [];
    const first = month.day() == 0 ? 6 : month.day() - 1;
    let day = 7 - first;
    const last = month.daysInMonth();
    const count = (last - day) / 7;

    weekStartEndDay.push(getMomentDate(1, day));
    for (let i = 0; i < count; i++) {
      weekStartEndDay.push(getMomentDate((day + 1), (Math.min(day += 7, last))));
    }

    return weekStartEndDay;
  };

  const month = moment([year, monthIndex - 1]);
  const weekList = weeks(month);
  const result = [];
  let summary = 0;

  weekList.forEach((date) => {
    const resultData = {
      x: `${date.startDate.format('D')} - ${date.endDate.format('D')}`,
      y: 0,
    };

    storage.forEach((item) => {
      const split = item.date.split('-');
      const dateData = split[2];
      const monthData = split[1];
      const yearData = split[0];
      if (yearData == year) {
        if (parseInt(monthData) == parseInt(monthIndex)) {
          if (dateData >= date.startDate.format('DD') && dateData <= date.endDate.format('DD')) {
            resultData.y += item.count;
          }
        }
      }
    });

    result.push(resultData);
  });

  result.forEach((data) => {
    summary += data.y;
  });

  return { category: result, summary };
};

export default weekData;
