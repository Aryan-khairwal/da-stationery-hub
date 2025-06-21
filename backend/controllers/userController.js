const userModel = require("../models/user.model")
const asyncHandler = require("../utils/asyncHandler")
const { hashPassword, comparePassword } = require("../utils/bcrypt")
const createToken = require("../utils/jwtToken")

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body
  if (!username || !email || !password) {
    throw new Error("Please fill all inputs")
  }

  const userExist = await userModel.findOne({ email })
  if (userExist) {
    res.status(400).json({ message: "User already exists!" })
  }

  const hashedPassword = await hashPassword(password)

  const response = await userModel.create({
    username,
    email,
    password: hashedPassword,
    isAdmin,
  })
  if (response) {
    res.status(201).json(response)
  }
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find()
  res.json(users)
})

const getUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id).select("-password")
  res.json(user)
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
    res.json({
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else throw new Error("cannot find the user")
})
const deleteUser = asyncHandler(async (req, res) => {
  const user = await userModel.findOneAndDelete({ _id: req.user._id })
  if (user) {
    res.status(204).send("user deleted")
  } else {
    throw new Error("cannot delete")
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

      res
        .cookie("jwt", token, { httpOnly: true })
        .json({ message: "login successful" })
        .status(200)
    } else res.send("no")
  } else res.send("Invalid Credentials")
})

const logoutUser = asyncHandler(async (req, res) => {
  res
    .cookie("jwt", "", { httpOnly: true, expires: new Date(0) })
    .json({ message: "Logout successful" })
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id)
  if (user) {
    res.status(200).json(user)
  } else {
    throw new Error("Cannot find the user")
  }
})
const updateUserById = asyncHandler(async (req, res) => {
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
    throw new Error("cannot find the user")
  }
})
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findOneAndDelete({ _id: req.params.id })
  if (user) {
    res.status(204).send("user deleted")
  } else {
    throw new Error("User not found ")
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
