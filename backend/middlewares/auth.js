const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
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
      return res.status(401).json({ message: error.message })
    }
  } else {
    return res.status(401).json({ message: "Not logged in" })
  }
})

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json({ error: "Not authorized as Admin" })
  }
})

module.exports = { authenticateUser, authorizeAdmin }
