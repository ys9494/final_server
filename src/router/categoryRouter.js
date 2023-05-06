const express = require("express");
const { categoryController } = require("../controller");
const { categoryMiddleware, commonMiddleware } = require("../middleware");

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
  commonMiddleware.checkIdFrom("params", "id"),
  commonMiddleware.checkNonExistenceFrom("params", "id", "카테고리"),
  categoryMiddleware.checkCompleteCategoryFrom("body"),
  categoryController.putCategory
);

categoryRouter.delete(
  "/:id",
  commonMiddleware.checkIdFrom("params", "id"),
  commonMiddleware.checkNonExistenceFrom("params", "id", "카테고리"),
  categoryController.deleteCategory
);

module.exports = categoryRouter;
