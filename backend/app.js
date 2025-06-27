const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
require("dotenv").config()

const app = express()

app.use(express.json()) // Parse JSON body
app.use(cookieParser())
app.use(cors()) //frontend access
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded body

app.use("/api/users", userRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
  res.send("Hello, Server is running :D")
})
module.exports = app
