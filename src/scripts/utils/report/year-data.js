const yearData = (storage) => {
  const yearNow = new Date().getFullYear();
  const dataCollections = [];
  let summary = 0;

  for (let i = 4; i >= 0; i--) {
    const result = {
      x: yearNow - i,
      y: 0,
    };

    storage.forEach((item) => {
      const split = item.date.split('-');
      const year = split[0];

      if (year == yearNow - i) result.y += item.count;
    });

    dataCollections.push(result);
  }

  dataCollections.forEach((item) => {
    summary += item.y;
  });

  return {
    category: dataCollections,
    summary,
  };
};

export default yearData;
