const { match } = require("path-to-regexp");
const match_function = match("/:language?/:pathname?");

module.exports = async (request, response, next) => {
  const { path: request_path } = request;
  const { params } = match_function(request_path);
  request.prefix = params ? params.prefix : null;
  request.language = params ? params.language : null;
  if (!request.language) {
    return response.redirect(301, "/zh/");
  };
  if (request.language !== "zh") {
    return response.redirect(301, "/zh/");
  };
  next();
}