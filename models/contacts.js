const Contact = require("../shema/contacts-schema");

async function listContacts(req, res, next) {
  const data = await Contact.find();

  return data;
}

async function getContactById(contactId) {
  const data = await Contact.findById(contactId);

  return data;
}
async function removeContact(contactId) {
  const data = await Contact.findByIdAndDelete(contactId);

  return data;
}
async function addContact(body) {
  const data = await Contact.create(body);

  return data;
}

async function updateContact(contactId, body) {
  const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  return data;
}

async function updateStatusContact(contactId, body) {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
