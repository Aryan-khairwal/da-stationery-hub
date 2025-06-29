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
  addReview,
  fetchTopProducts,
  fetchNewProducts,
} = require("../controllers/productController")

const checkProductId = require("../middlewares/checkProductId")

router
  .route("/")
  .get(getProducts)
  .post(authenticateUser, authorizeAdmin, formidable(), createProduct)

router.get("/all", getAllProducts)
router.get("/top", fetchTopProducts)
router.get("/new", fetchNewProducts)
router
  .route("/:id")
  .get(checkProductId, getProductById)
  .put(
    authenticateUser,
    authorizeAdmin,
    checkProductId,
    formidable(),
    updateProduct
  )
  .delete(authenticateUser, authorizeAdmin, checkProductId, deleteProduct)
router.route("/reviews/:id").post(authenticateUser, checkProductId, addReview)

module.exports = router
