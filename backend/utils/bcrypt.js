const bcrypt = require("bcrypt")

const hashPassword = async (plainPassword, saltRounds = 10) => {
  try {
    const hashed = await bcrypt.hash(plainPassword, saltRounds)
    return hashed
  } catch (error) {
    throw new Error("Password hashing failed")
  }
}

const comparePassword = async (givenPassword, realPassword) => {
  try {
    const match = await bcrypt.compare(givenPassword, realPassword)
    return match
  } catch (error) {
    throw new Error("Password comparing failed")
  }
}
module.exports = { hashPassword, comparePassword }
