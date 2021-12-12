const { NotFound } = require("http-errors");
const { User } = require("../../models");
const fs = require("fs/promises");
const path = require("path");
var Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  try {
    const resultUpload = path.join(avatarDir, id, `${id}_${originalname}`);
    Jimp.read(tempUpload)
      .then((img) => {
        return img.resize(250, 250).quality(60).write(resultUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("/avatars", id, `${id}_${originalname}`);

    const result = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      {
        new: true,
      }
    );
    if (!result) {
      throw new NotFound(`Not found avatar`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = updateAvatar;
