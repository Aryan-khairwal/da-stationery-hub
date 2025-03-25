const cors = require("cors")
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", (req, res) => {
  res.send("<h1>Hello World!")
})

app.listen(process.env.PORT, () => {
  console.log("server is listening....")
})
