const { User } = require("../../models");
const { BadRequest } = require("http-errors");
const { sendMail } = require("../../helpers");
const BAZE_URL = "https://kapusta-team-project-back.herokuapp.com";

const repeatVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!email) {
    throw new BadRequest("Missing required field email");
  }

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Re-verification",
    html: `<a href="BAZE_URL/api/auth/verify/${user.verifyToken}">Click here to confirm registration</a>`,
  };
  await sendMail(mail);

  res.json({
    message: "Verification email sent",
    user,
  });
};

module.exports = repeatVerify;
