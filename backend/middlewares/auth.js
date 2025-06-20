const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const asyncHandler = require("../utils/asyncHandler")

const authenticateUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET)
      const user = await userModel.findById(decode.id).select("-password")
      req.user = user
      next()
    } catch (error) {
      res.status(401)
      throw new Error("Token not valid")
    }
  } else {
    res.status(401)
    throw new Error("Token not found")
  }
})

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send("Not authorized as Admin")
  }
})

module.exports = { authenticateUser, authorizeAdmin }
