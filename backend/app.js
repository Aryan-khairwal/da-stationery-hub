const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
require("dotenv").config()

const app = express()

app.use(express.json()) // Parse JSON body
app.use(cookieParser())
app.use(cors()) //frontend access
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded body

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
  res.send("Hello, Server is running :D")
})
module.exports = app
