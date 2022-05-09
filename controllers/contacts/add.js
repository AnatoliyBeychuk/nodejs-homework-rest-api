const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  try {
    const { _id } = req.user;
    const { phone } = req.body;
    const contact = await Contact.findOne({ owner: _id, phone });
    if (contact) {
      throw createError(409);
    }
    const result = await Contact.create({ ...req.body, owner: _id });
    res.json(result);
  } catch (error) {
    throw createError(409, "Contact with this phone number already exists!");
  }
};

module.exports = add;
