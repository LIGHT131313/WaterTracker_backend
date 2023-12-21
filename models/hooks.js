export const handleSaveError = (err, data, next) => {
  const { name, code } = err;
  err.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

export const preUpdate = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
