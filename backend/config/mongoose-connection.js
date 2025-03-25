const mongoose = require("mongoose")

const URI = process.env.MONGODB_URI
async function connectDB() {
  await mongoose
    .connect(`${URI}/da_stationery_hub`)
    .then(() => {
      console.log("DB connected!")
    })
    .catch((err) => {
      console.log("Cannot connect to DB : ", err)
    })
}

module.exports = connectDB
