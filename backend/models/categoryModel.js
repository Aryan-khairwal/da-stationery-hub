const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxLength: 32,
  },
})

module.exports = mongoose.model("category", categorySchema)
