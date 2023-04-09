const generateRowKey = (data) => {
  let key = '';
  Object.values(data).forEach(function (cell) {
    key += `${cell}_`
  });

  return key;
};

export {
  generateRowKey
};