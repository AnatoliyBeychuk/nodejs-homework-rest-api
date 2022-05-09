const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashPassword });
  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = register;
