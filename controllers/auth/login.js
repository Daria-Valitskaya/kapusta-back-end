const { Unauthorized, BadRequest } = require("http-errors");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Wrong email or password");
  }

  if (!user.verify) {
    throw new BadRequest("User is not verified");
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
      name: user.name,
      token,
      email,
      balance: user.balance,
      id: user._id,
      verify: user.verify,
    },
  });
};

module.exports = login;
