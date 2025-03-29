const express = require("express")
const cors = require("cors")
const productRoutes = require("./routes/productRoutes")
require("dotenv").config()

const app = express()

app.use(express.json()) // Parse JSON body
app.use(cors()) //frontend access
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded body
app.use("/api", productRoutes)
app.get("/", (req, res) => {
  res.send("Hello, Server is running :D")
})
module.exports = app
