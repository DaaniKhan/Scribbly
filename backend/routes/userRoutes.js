import express from 'express'
import { loginUser, signupUser } from '../controllers/userController.js'

const router = express.Router()

// Login
router.post("/login", loginUser)

// Sign Up
router.post("Sign Up", signupUser)

export default router