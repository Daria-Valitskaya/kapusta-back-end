const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { User } = require("../../models");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Already registered');
  }
  const avatarURL = gravatar.url(email);
  const verifyToken = nanoid();
  const newUser = new User({
    name,
    email,
    avatarURL,
    verifyToken
  });
  newUser.setPassword(password);
  await newUser.save();

  const { URL } = process.env;

  const sendToEmail = {
    from: "retulanarine@gmail.com",
    to: newUser.email,
    subject: "Verify email",
    html: `<a href="${URL}/api/auth/verify/${verifyToken}" target="_blank">Please verify your email<a/>`,
  };
  
  sgMail.send(sendToEmail);
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Email sent successful'
  });
  
};

module.exports = signup;