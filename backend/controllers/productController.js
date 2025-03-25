const productModel = require("../models/product.model")

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ errorMSG: error })
  }
}

module.exports = { getProducts }
