const express = require("express");
const { balance: ctrl } = require("../../controllers");
const { authentificate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.patch("/balance", authentificate, ctrlWrapper(ctrl.putBalance));

module.exports = router;


