const express = require("express");

const router = express.Router();
const contactsFoo = require("../../models/contacts");

const isValidId = require("../../middlewares/isValidId");

const {
  newContactSchema,
  contactUpdateSchema,
  updateFavoriteContactSchema,
} = require("../../shemas_joi/shemas_joi");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsFoo.listContacts();
    console.log(contacts);
    res.status(200).json(contacts);
  } catch (error) {
    console.log("Error...try later");
    next(error);
  }
});

router.get("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsFoo.getContactById(contactId);
    if (contact) {
      console.log(contact);
      res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log("Error...try later");
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const value = newContactSchema.validate(req.body);
    if (typeof value.error !== "undefined") {
      return res.status(400).json({ message: value.error.details[0].message });
    }
    const result = await contactsFoo.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log("Error...try later");
    next(error);
  }
});

router.delete("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsFoo.removeContact(contactId);
    if (contact) {
      console.log(contact);
      res.status(200).json({ message: "Contact deleted" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log("Error...try later");
    next(error);
  }
});

router.put("/:contactId", isValidId, async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { contactId } = req.params;

    const result = await contactsFoo.updateContact(contactId, req.body);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", isValidId, async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const { error } = updateFavoriteContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { contactId } = req.params;
    const result = await contactsFoo.updateStatusContact(
      contactId,
      req.body.favorite,
      {
        new: true,
      }
    );
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
