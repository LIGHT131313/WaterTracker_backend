import express from "express";

import contactsControllers from "../../controllers/contacts-controller.js";

import {
  isEmptyBody,
  isValidId,
  authenticate,
  upload,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../../utils/validation/contactValidationSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", isValidId, contactsControllers.getById);

contactsRouter.post(
  "/",
  upload.single("avatar"),
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsControllers.add
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsControllers.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactFavoriteSchema),
  contactsControllers.updateById
);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteById);

export default contactsRouter;
