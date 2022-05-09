const express = require("express");
const controllers = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const { validation, auth } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, controllerWrapper(controllers.getAll));

router.get("/:contactId", auth, controllerWrapper(controllers.getById));

router.post(
  "/",
  auth,
  validation(schemas.add),
  controllerWrapper(controllers.add)
);

router.delete("/:contactId", auth, controllerWrapper(controllers.remove));

router.put(
  "/:contactId",
  auth,
  validation(schemas.add),
  controllerWrapper(controllers.update)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validation(schemas.updateFavorite),
  controllerWrapper(controllers.updateFavorite)
);

module.exports = router;
