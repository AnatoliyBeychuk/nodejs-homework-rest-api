const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  if (body.constructor === Object && Object.keys(body).length === 0) {
    throw createError(400, "missing field favorite");
  }
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateFavorite;
