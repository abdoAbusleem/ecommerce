const jwt = require("jsonwebtoken");
const { isTokenExpired } = require("../helpers/checkTokenExpiry")

module.exports.auth = function (req, res, next) {


  if (!req.cookies.accessToken || isTokenExpired(req.cookies.accessToken)) {
    return res.status(401).send("please login before any operation")
  }
  else {
    try {
      const decoded = jwt.verify(req.cookies.accessToken, 'secret');

      if (decoded) {
        res.locals.id = decoded.id
        return next()
      }
    } catch (err) {
      return res.status(401).send(err, "you are not authorized to do any operation")
    }
  }
}
