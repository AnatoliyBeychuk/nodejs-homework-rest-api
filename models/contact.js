const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      match: /^.+@(?:[\w-]+\.)+\w+$/,
    },
    phone: {
      type: String,
      required: true,
      match: [phoneRegexp, "example: (067)777-77-77"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string().length(14).pattern(phoneRegexp).required(),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  add: contactJoiSchema,
  updateFavorite: updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
