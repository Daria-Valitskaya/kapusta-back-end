const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

// const { user } = require("./schemas");
// const { userSchema } = require("./schemas");

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailRegex,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  balance: {
    type: Number,
    default: 0,
  },
  avatarURL: {
    type: String,
    required: true,
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSchema = Joi.object({
  name: Joi.string(),
  password: Joi.string().min(9).max(15).required(),
  email: Joi.string().required().email({
    minDomainSegments: 2,
  }),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
};
