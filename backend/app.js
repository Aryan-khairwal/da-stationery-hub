const express = require("express")
const cors = require("cors")
const productRoutes = require("./routes/productRoutes")
require("dotenv").config()

const app = express()

app.use(express.json()) // Parse JSON body
app.use(cors()) //frontend access

app.use("/api", productRoutes)
app.get("/", (req, res) => {
  res.send("Hello World :D")
})
module.exports = app
