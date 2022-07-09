

module.exports = async (request, response, next) => {
  const { API_TOKEN } = request.cookies;
  if (!API_TOKEN) {
    request.auth = false;
    next();
  } else {
    request.auth = true;
    next();
  }
};