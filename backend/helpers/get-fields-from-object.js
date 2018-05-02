module.exports = (object, fields) => {
  return fields.reduce((acc, field) => {
    return {
      ...acc,
      [field]: object[field], 
    };
  }, {});
}