const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailReqexp = /^.+@(?:[\w-]+\.)+\w+$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailReqexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const registrJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailReqexp).required(),
});

const schemas = {
  register: registrJoiSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
