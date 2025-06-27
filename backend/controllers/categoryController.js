const categoryModel = require("../models/categoryModel")
const asyncHandler = require("../utils/asyncHandler")

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: "Category name is mandatory" })
  }

  const existingCategory = await categoryModel.findOne({ name })
  if (existingCategory) {
    return res.status(409).json({ error: "Category already exists" })
  }

  const category = await categoryModel.create({ name })
  return res.status(201).json({
    message: "Category created successfully",
    category,
  })
})

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: "Category name is required" })
  }
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    )

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" })
    }

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

const getCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  try {
    const category = await categoryModel.findById(categoryId)
    if (!category) {
      return res.status(404).json({ message: "category not found" })
    }
    return res.status(200).json(category)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})
const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  try {
    const category = await categoryModel.findById(categoryId)
    if (!category) {
      return res.status(404).json({ error: "Category not found" })
    }

    await categoryModel.findByIdAndDelete(categoryId)
    return res.status(200).json({ message: "Category deleted successfully" })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

const listCategory = asyncHandler(async (req, res) => {
  const categories = await categoryModel.find({})
  return res.status(200).json(categories)
})

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  listCategory,
}
