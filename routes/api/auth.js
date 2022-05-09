const express = require("express");
const controllers = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { validation } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { auth } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.register),
  controllerWrapper(controllers.register)
);

router.post(
  "/login",
  validation(schemas.login),
  controllerWrapper(controllers.login)
);

router.get("/current", auth, controllerWrapper(controllers.current));

router.get("/logout", auth, controllerWrapper(controllers.logout));

router.patch(
  "/",
  auth,
  validation(schemas.subscription),
  controllerWrapper(controllers.subscription)
);

module.exports = router;
