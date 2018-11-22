function logErrorOrDefault(error, default_error) {
  if (!error.length) { error = default_error; }
  console.error(error);
};