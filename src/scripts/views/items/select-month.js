const monthData = [
  {
    value: 1,
    text: 'Januari',
  },
  {
    value: 2,
    text: 'Februari',
  },
  {
    value: 3,
    text: 'Maret',
  },
  {
    value: 4,
    text: 'April',
  },
  {
    value: 5,
    text: 'Mei',
  },
  {
    value: 6,
    text: 'Juni',
  },
  {
    value: 7,
    text: 'Juli',
  },
  {
    value: 8,
    text: 'Agustus',
  },
  {
    value: 9,
    text: 'September',
  },
  {
    value: 10,
    text: 'Oktober',
  },
  {
    value: 11,
    text: 'November',
  },
  {
    value: 12,
    text: 'Desember',
  },
];

const selectMonth = (month) => {
  let result = '';

  monthData.forEach((element) => {
    if (parseInt(month) === parseInt(element.value)) result += `<option value="${element.value}" selected>${element.text}</option>`;

    result += `<option value="${element.value}">${element.text}</option>`;
  });

  return result;
};

export default selectMonth;
