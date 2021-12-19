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
); // тут все транзакции юзера за год, суммы сгруппированы по месяцам. В зависимости от даты

router.get(
  "/categories/:type/:date",
  authentificate,
  ctrlWrapper(ctrl.getSummaryByCategory)
); //массив с операциями(income или expense) за месяц выбраной даты (указывать 01.12.2021 если хочешь декабрь)

router.delete("/:id", authentificate, ctrlWrapper(ctrl.deleteTransaction));

router.get(
  "/:type/:period",
  authentificate,
  ctrlWrapper(ctrl.getTransForPeriod)
); //массив с операциями(income или expense) за указанную дату(день, месяц, год) и общаая их сумма

module.exports = router;
