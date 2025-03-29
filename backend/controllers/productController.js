const productModel = require("../models/product.model")

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ errorMSG: error })
  }
}
const postProducts = async (req, res) => {
  const { name, price, description, image } = req.body
  try {
    const response = await productModel.create({
      name,
      price,
      description,
      image,
    })
    console.log(response)
    res.status(201).json({ message: "Product added successfully" })
  } catch (error) {
    res.status(500).json({ error_message: error })
  }
}

module.exports = { getProducts, postProducts }
