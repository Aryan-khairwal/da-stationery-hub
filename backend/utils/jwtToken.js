const jwt = require("jsonwebtoken")

const createToken = async (data) => {
  const token = await jwt.sign(data, process.env.JWT_SECRET)
  return token
}

module.exports = createToken
