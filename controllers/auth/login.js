const { Unauthorized } = require('http-errors');
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  

  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized('Wrong email or password or email not verify');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "Success",
    code: 200,
    data: {
      token,
      email,
      balance: user.balance,
      id: user._id,
    },
  });
};

module.exports = login;