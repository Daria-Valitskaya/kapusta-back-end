const getCurrentUser = async (req, res, next) => {
  const { email, balance, name } = req.user;
  res.json({
    status: "success",
    code: 200,
    email,
    balance,
    name,
  });
};

module.exports = getCurrentUser;
