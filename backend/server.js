const app = require("./app")
const connectDB = require("./config/dbConnection")

connectDB() // Connect to MongoDB

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
