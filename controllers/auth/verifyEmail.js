const { Conflict } = require('http-errors');
const { User } = require("../../models");
const verifyEmail = async (req, res, next) => {
  const { verifyToken } = req.params;
  
  const user = await User.findOne({ verifyToken });
  if (!user) {
    throw new Conflict('User not found by token during email verification');
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });
  res.json({
    status: "success",
    code: 200,
    message: "Verification success",
  });
};

module.exports = verifyEmail;