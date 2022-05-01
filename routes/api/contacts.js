const express = require("express");
const controllers = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const { validation } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controllerWrapper(controllers.getAll));

router.get("/:contactId", controllerWrapper(controllers.getById));

router.post("/", validation(schemas.add), controllerWrapper(controllers.add));

router.delete("/:contactId", controllerWrapper(controllers.remove));

router.put(
  "/:contactId",
  validation(schemas.add),
  controllerWrapper(controllers.update)
);

router.patch(
  "/:contactId/favorite",
  validation(schemas.updateFavorite),
  controllerWrapper(controllers.updateFavorite)
);

module.exports = router;
