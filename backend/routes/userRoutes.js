const express = require("express")
const router = express.Router()
const { authenticateUser, authorizeAdmin } = require("../middlewares/auth")
const {
  createUser,
  getAllUsers,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
} = require("../controllers/userController")

router
  .route("/")
  .post(createUser)
  .get(authenticateUser, authorizeAdmin, getAllUsers)

router
  .route("/profile")
  .get(authenticateUser, getUser)
  .put(authenticateUser, updateUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

module.exports = router
