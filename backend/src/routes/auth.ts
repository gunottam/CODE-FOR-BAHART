import express from 'express'
import { User } from '../models/User'
import bcrypt from 'bcrypt'

const router = express.Router()

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  console.log("LOGIN ROUTE HIT:", req.body)

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    // Exclude password from returned user object
    const { password: _pw, ...userWithoutPassword } = user.toObject();
    res.json({ message: 'Login successful', user: userWithoutPassword })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : String(err) })
  }
})

// SIGNUP
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  console.log("SIGNUP ROUTE HIT:", req.body)

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })

    res.status(201).json({ message: 'User registered successfully', user })
  } catch (err) {
    console.error("Signup error:", err)
    res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : String(err) })
  }
})

export default router
