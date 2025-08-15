const express = require('express');
const {
  RegisterUser,
  requestOtp,
  verifyOtp,
  LogoutUser,
  checkAuth,
} = require('../controller/AuthController');
const { Authentication } = require('../middleware/AuthMiddleware');

const authRoute = express.Router();

// Registration
authRoute.post('/register', RegisterUser);

// Login - Step 1: Request OTP
authRoute.post('/request-otp', requestOtp);

// Login - Step 2: Verify OTP
authRoute.post('/verify-otp', verifyOtp);

// Logout
authRoute.post('/logout', LogoutUser);

// Auth check (with JWT middleware)
authRoute.get('/check-auth', Authentication, checkAuth);

module.exports = authRoute;
