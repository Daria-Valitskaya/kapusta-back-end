const queryString = require("query-string");
const axios = require("axios");
require("dotenv").config();
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { nanoid } = require("nanoid");

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  console.log(code);

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `https://kapusta-team-project-back.herokuapp.com/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { name, email } = userData.data;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    const newUser = await User.create({
      name,
      email,
      verify: true,
    });
    newUser.setPassword(nanoid());
    await newUser.save();

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    const { _id } = newUser;
    await User.findByIdAndUpdate(user._id, { token });

    return res.redirect(
      `https://kapusta-team-project-front.netlify.app/?access_token=${token}&email=${userData.data.email}`
    );
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  return res.redirect(
    `https://kapusta-team-project-front.netlify.app/api/users/google-redirect/?access_token=${token}`
  );
};

module.exports = googleRedirect;
