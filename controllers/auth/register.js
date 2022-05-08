const { createError } = require("../../helpers");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email in use");
  }
  const user = await User.create({ email, password });
  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = register;
