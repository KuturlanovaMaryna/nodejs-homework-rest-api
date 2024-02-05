const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");
const { validateBody } = require("../../middlewares/validateBody");

const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logOut);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionListSchema),
  ctrl.updateSubscription
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
router.get("/verify/:verificationToken", ctrl.verify);
router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrl.resendVerifyEmail
);

module.exports = router;
