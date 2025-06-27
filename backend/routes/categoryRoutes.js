const express = require("express")
const router = express.Router()

const { authenticateUser, authorizeAdmin } = require("../middlewares/auth")
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  listCategory,
} = require("../controllers/categoryController")

router
  .route("/")
  .get(authenticateUser, authorizeAdmin, listCategory)
  .post(authenticateUser, authorizeAdmin, createCategory)

router
  .route("/:categoryId")
  .get(authenticateUser, authorizeAdmin, getCategory)
  .put(authenticateUser, authorizeAdmin, updateCategory)
  .delete(authenticateUser, authorizeAdmin, deleteCategory)

module.exports = router
