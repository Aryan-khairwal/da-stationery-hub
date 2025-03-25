const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
})

module.exports = mongoose.model("product", productSchema)
