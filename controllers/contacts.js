const Contact = require("../shema/contacts-schema");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const {
  newContactSchema,
  contactUpdateSchema,
  updateFavoriteContactSchema,
} = require("../shemas_joi/shemas_joi");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  console.log(contacts);
  return res.status(200).json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (contact) {
    console.log(contact);
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (contact) {
    console.log(contact);
    return res.status(200).json({ message: "Contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
};

const addContact = async (req, res, next) => {
  const value = newContactSchema.validate(req.body);
  if (typeof value.error !== "undefined") {
    return res.status(400).json({ message: value.error.details[0].message });
  }
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  return res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { error } = contactUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { error } = updateFavoriteContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(result);
};
module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
