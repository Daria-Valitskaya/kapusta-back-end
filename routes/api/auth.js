const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validation, authentificate, upload } = require("../../middlewares");

const { joiSchema, joiSchema2 } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");
const { balance: ctrll } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.get("/verify/:verifyToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", ctrlWrapper(ctrl.repeatVerify));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", authentificate, ctrlWrapper(ctrl.getCurrentUser));
router.get("/logout", authentificate, ctrlWrapper(ctrl.logout));
router.patch(
  "/avatars",
  upload.single("avatar"),
  authentificate,
  ctrlWrapper(ctrl.updateAvatar)
);

router.post("/balance", authentificate, validation(joiSchema2), ctrlWrapper(ctrll.putBalance));
module.exports = router;
