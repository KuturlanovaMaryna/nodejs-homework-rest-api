const express = require("express");

const router = express.Router();

const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

const ctrl = require("../../controllers/contacts");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put("/:contactId", authenticate, isValidId, ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  ctrl.updateStatusContact
);

module.exports = router;
