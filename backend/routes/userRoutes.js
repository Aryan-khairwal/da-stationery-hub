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
  getUserById,
  deleteUser,
  deleteUserById,
  updateUserById,
} = require("../controllers/userController")

router
  .route("/")
  .get(authenticateUser, authorizeAdmin, getAllUsers)
  .post(createUser)
  .delete(authenticateUser, deleteUser)

router
  .route("/profile")
  .get(authenticateUser, getUser)
  .put(authenticateUser, updateUser)

router.post("/login", loginUser)
router.post("/logout", logoutUser)

router
  .route("/:id")
  .get(authenticateUser, authorizeAdmin, getUserById)
  .put(authenticateUser, authorizeAdmin, updateUserById)
  .delete(authenticateUser, authorizeAdmin, deleteUserById)

module.exports = router
