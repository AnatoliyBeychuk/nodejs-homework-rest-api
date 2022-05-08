const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw createError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = remove;
