const asyncHandler = (func) => (req, res, next) => {
  func(req, res, next).catch((error) => {
    res.status(500).json({ message: error.message })
  })
}

module.exports = asyncHandler
