const { isValidObjectId } = require("mongoose")
const asyncHandler = require("../utils/asyncHandler")

const checkProductId = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid product id" })
  }
  next()
})

module.exports = checkProductId
