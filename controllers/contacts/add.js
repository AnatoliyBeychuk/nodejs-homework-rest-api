const { createError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  if (!result) {
    throw createError(409, "Contact with this phone number already exists!");
  }
  res.json(result);
};

module.exports = add;
