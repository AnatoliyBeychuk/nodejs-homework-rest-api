const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");
const { User } = require("../../models/user");

const subscription = async (req, res) => {
  const { body } = req;
  const { subscription } = req.body;
  const { _id } = req.user;

  if (body.constructor === Object && Object.keys(body).length === 0) {
    throw createError(400, "missing fields");
  }
  const isValid = isValidObjectId(_id);
  if (!isValid) {
    throw createError(404);
  }
  const user = await User.findOne({ _id: _id, subscription });
  if (user) {
    throw createError(409, "Current subscription already in use!");
  }
  const result = await User.findByIdAndUpdate(_id, body, {
    new: true,
    select: "email subscription",
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = subscription;
