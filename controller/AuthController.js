const jwt = require('jsonwebtoken');
const User = require('../model/User');
const transporter = require('../config/nodemailer');
const { EMAIL_TEMPLATE } = require('../config/emailtemplate');


// ===========================
// Register New User
// ===========================
const RegisterUser = async (req, res) => {
  const { fullName, matricNumber, email } = req.body;

  if (!fullName || !matricNumber || !email) {
    return res.json({
      success: false,
      message: 'Full name, matric number, and email are required.',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: 'User with this email already exists.',
      });
    }

    const newUser = new User({
      fullName,
      matricNumber,
      email,
      role: 'student',
      hasVoted: {},
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: 'Registration successful.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===========================
// Request OTP (Login Step 1)
// ===========================
const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
     const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();


    const year=new Date().getFullYear();

    const mailOptions = {
      to: email,
      subject: 'Login OTP for Voting',
      html:EMAIL_TEMPLATE.replace('{{otp}}',otp).replace('{{email}}',email).replace('{{user}}',user.fullName).replace('{{year}}',year)
    };

  

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'OTP sent to your email' });

  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};



// ===========================
// Verify OTP (Login Step 2)
// ===========================

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }); 

  if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "2d" }
  );

  res.json({
    success: true,
    token,
    user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
  });
};

// ===========================
// Logout
// ===========================
const LogoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
    });

    return res.json({
      success: true,
      message: 'User logged out successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===========================
// Check Auth Session
// ===========================
const checkAuth = async (req, res) => {
  try {
    const user = req.User; // middleware should populate this from JWT
    return res.json({
      success: true,
      message: 'Authorized user',
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};

module.exports = {
  RegisterUser,
  requestOtp,
  verifyOtp,
  LogoutUser,
  checkAuth,
};
