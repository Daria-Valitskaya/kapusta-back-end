const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models");

const { sendMail } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");
const avatarDir = path.join(__dirname, "../../public/avatars");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "conflict",
      code: 409,
      message: "Already registered",
      verify: user.verify,
    });
  }

  const avatarURL = gravatar.url(email, {
    d: "mp",
    protocol: "https",
  });

  const verifyToken = nanoid();
  const newUser = new User({
    name,
    email,
    avatarURL,
    verifyToken,
  });
  newUser.setPassword(password);
  await newUser.save();

  const sendToEmail = {
    from: "retulanarine@gmail.com",
    to: newUser.email,
    subject: "Verify email",
    html: `<a href="http://localhost:3001/api/auth/verify/${verifyToken}" target="_blank">Please verify your email<a/>`,
  };

  await sendMail(sendToEmail);
  const avatarFolder = path.join(avatarDir, String(newUser._id));
  await fs.mkdir(avatarFolder);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Email sent successful",
  });
};

module.exports = signup;
