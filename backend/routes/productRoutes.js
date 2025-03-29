const {
  getProducts,
  postProducts,
} = require("../controllers/productController")
const express = require("express")
const router = express.Router()

router.get("/products", getProducts)
router.post("/products", postProducts)

module.exports = router
