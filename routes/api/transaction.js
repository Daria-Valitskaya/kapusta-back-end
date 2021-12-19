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
  "/summary/:type/:date",
  authentificate,
  ctrlWrapper(ctrl.getSummary)
);

router.get(
  "/categories/:type/:date",
  authentificate,
  ctrlWrapper(ctrl.getSummaryByCategory)
);

router.delete("/:id", authentificate, ctrlWrapper(ctrl.deleteTransaction));

router.get("/:type/:period", authentificate, ctrlWrapper(ctrl.getTransForPeriod));

module.exports = router;