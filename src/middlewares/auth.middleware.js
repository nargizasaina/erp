const jwt = require("jsonwebtoken");
const { User, Token } = require("../models");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  let authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ message: "Not authorized!" });


  const tokenRecord = await Token.findOne({ where: { accessToken: token } });
  if (!tokenRecord) return res.status(403).send({ message: "You don't have permission to access" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Not authorized!",
      });
    }

    req.userId = decoded.id;
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(401).send({
        message: "Not authorized!",
      });
    }
    req.token = token;
    req.user = user;
    next()
  });
};

module.exports = {
  verifyToken
}