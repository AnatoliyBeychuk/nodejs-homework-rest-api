const express = require("express");
const controllers = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { validation } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.register),
  controllerWrapper(controllers.register)
);

module.exports = router;
