// eslint-disable-next-line import/prefer-default-export
export const commaSeparateNumber = (val) => {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    // eslint-disable-next-line no-useless-concat
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }
  return val;
};
