const notFound = (req, res, next) => {
  //   console.log(req);

  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log(err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  //   check for mongoose bad obj ID
  if (err.name === "CastError") {
    message = "Resource not found";
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
  });
};

export { notFound, errorHandler };
