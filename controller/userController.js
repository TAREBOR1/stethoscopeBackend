const User = require('../model/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json({
      success: true,
      message: 'All users fetched successfully',
      users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch users',
    });
  }
};

module.exports = { getAllUsers };
