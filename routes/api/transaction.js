const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validation, authentificate } = require("../../middlewares");

const { Transaction } = require("../../models/transaction");
const { transaction: ctrl } = require("../../controllers");

const router = express.Router();

router.patch(
  "/income",
  authentificate,
  validation(Transaction),
  ctrlWrapper(ctrl.Income)
);

module.exports = router;
