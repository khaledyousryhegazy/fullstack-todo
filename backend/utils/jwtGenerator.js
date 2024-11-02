const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = jwtGenerator = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};
