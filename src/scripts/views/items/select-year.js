const selectYear = () => {
  const yearNow = new Date().getFullYear();
  let options = '';

  for (let i = 0; i <= 5; i++) {
    if (yearNow === yearNow + i) {
      `<option value="${yearNow}" selected>${yearNow}</option>`;
    }
    options += `<option value="${yearNow - i}">${yearNow - i}</option>`;
  }

  return options;
};

export default selectYear;
