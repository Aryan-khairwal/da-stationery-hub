const userModel = require("../models/userModel")
const asyncHandler = require("../utils/asyncHandler")
const { hashPassword, comparePassword } = require("../utils/bcrypt")
const createToken = require("../utils/jwtToken")

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All inputs are required" })
  }

  const userExist = await userModel.findOne({ email })
  if (userExist) {
    return res.status(400).json({ message: "User already exists!" })
  }

  const hashedPassword = await hashPassword(password)

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
    isAdmin,
  })

  return res.status(201).json({
    message: "User created successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    },
  })
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find().select("-password")
  return res.status(200).json(users)
})

const getUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id).select("-password")
  return res.status(200).json(user)
})
const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id)
  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin

    if (req.body.password) {
      const hashedPassword = await hashPassword(req.body.password)
      user.password = hashedPassword
    }
    const updatedUser = await user.save()
    res.status(200).json({
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    return res.status(404).json({ message: "User not found" })
  }
})
const deleteUser = asyncHandler(async (req, res) => {
  const user = await userModel.findOneAndDelete({ _id: req.user._id })
  if (user) {
    res.status(204).json({ message: "user deleted" })
  } else {
    res.status(404).json({ message: "user not found" })
  }
})
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const existingUser = await userModel.findOne({ email })
  if (existingUser) {
    const match = await comparePassword(password, existingUser.password)
    if (match) {
      const token = await createToken({
        id: existingUser._id,
      })

      res.cookie("jwt", token, { httpOnly: true })
      return res.status(200).json({ message: "login successful" })
    } else return res.status(404).json({ message: "Invalid Credentials" })
  } else return res.status(404).json({ message: "Invalid Credentials" })
})

const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(204)
    .json({ message: "Logout successful" })
    .cookie("jwt", "", { httpOnly: true, expires: new Date(0) })
})

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    if (user) {
      return res.status(200).json(user)
    } else {
      res.status(404).json({ message: "user not found" })
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})
const updateUserById = asyncHandler(async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    if (user) {
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin || user.isAdmin

      if (req.body.password) {
        const hashedPassword = await hashPassword(req.body.password)
        user.password = hashedPassword
      }
      const updatedUser = await user.save()
      res.json({
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      return res.status(404).json({ message: "user not found" })
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})
const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const user = await userModel.findOneAndDelete({ _id: req.params.id })
    if (user) {
      res.status(204).send("user deleted")
    } else {
      return res.status(404).json({ message: "user not found" })
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

module.exports = {
  createUser,
  getUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
}
