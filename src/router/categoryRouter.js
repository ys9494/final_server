const express = require("express");
const { categoryController } = require("../controller");
const { categoryMiddleware } = require("../middleware");

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  categoryMiddleware.checkCompleteCategoryFrom("body"),
  categoryMiddleware.checkExistCategoryFrom("body"),
  categoryController.postCategory
);

categoryRouter.get("/", categoryController.getCategories);

categoryRouter.put(
  "/:id",
  categoryMiddleware.checkCategoryIdFrom("params"),
  categoryMiddleware.checkCompleteCategoryFrom("body"),
  categoryController.putCategory
);

categoryRouter.delete(
  "/:id",
  categoryMiddleware.checkCategoryIdFrom("params"),
  categoryController.deleteCategory
);

module.exports = categoryRouter;
