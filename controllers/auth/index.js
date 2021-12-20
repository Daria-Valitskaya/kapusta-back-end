const signup = require("./signup");
const login = require("./login");
const getCurrentUser = require("./getCurrentUser");
const logout = require("./logout");
const verifyEmail = require("./verifyEmail");
const updateAvatar = require("./updateAvatar");
const repeatVerify = require("./repeatVerify");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");

module.exports = {
  signup,
  login,
  getCurrentUser,
  logout,
  verifyEmail,
  updateAvatar,
  repeatVerify,
  googleAuth,
  googleRedirect,
};
