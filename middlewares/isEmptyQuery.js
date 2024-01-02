import { HttpError } from "../helpers/index.js";

const isEmptyQuery = async (req, res, next) => {
  const keys = Object.keys(req.query);
  if (!keys.length) {
    return next(HttpError(400, "Query must have fields"));
  }
  next();
};

export default isEmptyQuery;
