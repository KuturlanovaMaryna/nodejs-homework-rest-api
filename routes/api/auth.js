const express = require("express");

const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");
const { validateBody } = require("../../middlewares/validateBody");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
