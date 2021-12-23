const queryString = require("query-string");
const axios = require("axios");

const BASE_URL = "https://kapusta-team-project-back.herokuapp.com";
const FRONTEND_URL = "https://kapusta-team-project-front.netlify.app";
const GOOGLE_CLIENT_ID =
  "88887492623-i2flcc9sjf1a2nbti43i3l1udqvvverf.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

exports.googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  console.log("code");

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
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

  // userData.data.email
  // ...
  // ...
  // ...
  return res.redirect(`${FRONTEND_URL}?email=${userData.data.email}`);
};
