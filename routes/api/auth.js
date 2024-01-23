const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");
const { validateBody } = require("../../middlewares/validateBody");

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

module.exports = router;
