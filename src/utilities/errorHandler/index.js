export const errorHandler = async (errorText, value, httpStatusCode) => {
    const err = new Error();
    err.errors = [{ value: value, msg: errorText }];
    err.httpStatusCode = httpStatusCode || 400;
    return err;
  };