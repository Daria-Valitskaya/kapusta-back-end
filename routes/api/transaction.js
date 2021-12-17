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

router.patch(
  "/expenses",
  authentificate,
  validation(Transaction),
  ctrlWrapper(ctrl.expenses)
);

router.get(
  "/summary/:date/:transType",
  authentificate,
  ctrlWrapper(ctrl.getSummary)
);

router.delete("/:id", authentificate, ctrlWrapper(ctrl.deleteTransaction));

module.exports = router;
