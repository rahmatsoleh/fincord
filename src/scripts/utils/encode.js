const encode = (data) => {
  let formBody = [];
  for (const property in data) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(data[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join('&');
  return formBody;
};
export default encode;
