const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const contact = await Contact.findOne({ owner: _id, _id: contactId });
  if (!contact) {
    throw createError(404);
  }
  const result = await Contact.findByIdAndRemove(contact._id);
  if (!result) {
    throw createError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = remove;
