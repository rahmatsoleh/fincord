const getNumberFromString = (inputValue) => {
  if (inputValue) {
    const splitString = inputValue.split(' ');
    const getNumber = splitString[1];
    const numberValue = parseInt(getNumber.split('.').join(''));

    return numberValue;
  }

  return 0;
};

export default getNumberFromString;
