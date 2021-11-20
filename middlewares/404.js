const path = require("path");

const notFound404 = (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../pages/404.html"));
};

module.exports = notFound404;
