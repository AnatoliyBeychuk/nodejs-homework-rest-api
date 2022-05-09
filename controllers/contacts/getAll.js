const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const options = { skip, limit };
  const filter = {};
  if (favorite) {
    filter.favorite = favorite;
  }
  const result = await Contact.find(
    { owner: _id, ...filter },
    "",
    options
  ).populate("owner", "email");
  res.json(result);
};

module.exports = getAll;
