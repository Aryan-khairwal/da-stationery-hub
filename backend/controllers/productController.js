const productModel = require("../models/productModel")
const asyncHandler = require("../utils/asyncHandler")

const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, price, description, image, countInStock, category } =
    req.fields

  switch (true) {
    case !name:
      return res.json({ error: "Name is required" })
    case !brand:
      return res.json({ error: "Brand is required" })
    case !description:
      return res.json({ error: "Description is required" })
    case !image:
      return res.json({ error: "Image is required" })
    case !price:
      return res.json({ error: "Price is required" })
    case !category:
      return res.json({ error: "Category is required" })
    case !countInStock:
      return res.json({ error: "Count in stock is required" })
  }

  try {
    const product = await productModel.create({
      name,
      brand,
      price,
      description,
      image,
      countInStock,
      category,
    })

    return res.status(201).json(product)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { name, brand, price, description, image, countInStock, category } =
    req.fields

  switch (true) {
    case !name:
      return res.json({ error: "Name is required" })
    case !brand:
      return res.json({ error: "Brand is required" })
    case !description:
      return res.json({ error: "Description is required" })
    case !image:
      return res.json({ error: "Image is required" })
    case !price:
      return res.json({ error: "Price is required" })
    case !category:
      return res.json({ error: "Category is required" })
    case !countInStock:
      return res.json({ error: "Count in stock is required" })
  }

  try {
    const product = await productModel.findByIdAndUpdate(
      id,
      { ...req.fields },
      { new: true }
    )

    return res.status(200).json(product)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id
  try {
    await productModel.findByIdAndDelete(id)
    return res.status(204).json({ message: "product deleted" })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

const getProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {}

    const count = await productModel.countDocuments({ ...keyword })
    const products = await productModel.find({ ...keyword }).limit(pageSize)

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const product = await productModel.findById(id)
    return res.status(200).json(product)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 })

    return res.json(products)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

const addReview = asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body
  try {
    const product = await productModel.findById(req.params.id)
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id
      )
      if (alreadyReviewed) {
        return res.status(400).json({ message: "already reviewed" })
      }
      const review = {
        username: req.user.username,
        user: req.user._id,
        rating,
        title,
        comment,
      }
      product.reviews.push(review)
      product.reviewsCount = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
      await product.save()
      res.status(201).json({ message: "Review added" })
    } else {
      return res.status(404).json({ message: "product not found" })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ rating: -1 }).limit(4)
    return res.status(200).json(products)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})
const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await productModel.find().sort({ _id: -1 }).limit(5)
    return res.status(200).json(products)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})
module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  addReview,
  fetchTopProducts,
  fetchNewProducts,
}
