const { getProducts } = require("../controllers/productController")
const express = require("express")
const router = express.Router()

router.get("/products", getProducts)

module.exports = router
