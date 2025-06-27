const formidable = require("express-formidable")
const express = require("express")
const router = express.Router()
const { authenticateUser, authorizeAdmin } = require("../middlewares/auth")
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
} = require("../controllers/productController")
const checkProductId = require("../middlewares/checkProductId")

router
  .route("/")
  .get(authenticateUser, authorizeAdmin, getProducts)
  .post(authenticateUser, authorizeAdmin, formidable(), createProduct)

router.get("/all", authenticateUser, authorizeAdmin, getAllProducts)
router
  .route("/:id")
  .get(authenticateUser, authorizeAdmin, checkProductId, getProductById)
  .put(
    authenticateUser,
    authorizeAdmin,
    checkProductId,
    formidable(),
    updateProduct
  )
  .delete(authenticateUser, authorizeAdmin, checkProductId, deleteProduct)

module.exports = router
