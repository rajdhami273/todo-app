const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../config");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(498).send({ message: "Token is required" });
  }
  jwt.verify(token, jwtSecretKey, (err, data) => {
    if (err) {
      return res.status(498).send({ message: "Token is invalid" });
    }
    req.user = data.user;
    next();
  });
};
