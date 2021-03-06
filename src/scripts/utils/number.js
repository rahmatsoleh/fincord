/* eslint-disable import/prefer-default-export */
export const commaSeparateNumber = (val) => {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
  }
  return val;
};
