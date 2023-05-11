const express = require("express");
const { categoryController } = require("../controller");
const { categoryMiddleware, commonMiddleware } = require("../middleware");

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  categoryMiddleware.checkCompleteCategoryFrom("body"),
  categoryMiddleware.checkExistCategoryNameFrom("body"),
  categoryController.postCategory
);

categoryRouter.get("/", categoryController.getCategories);

categoryRouter.patch(
  "/:categoryId",
  commonMiddleware.checkIdFrom("params", "categoryId"),
  commonMiddleware.checkNonExistenceFrom("params", "categoryId", "카테고리"),
  categoryMiddleware.checkCompleteCategoryFrom("body"),
  categoryController.patchCategory
);

categoryRouter.delete(
  "/:categoryId",
  commonMiddleware.checkIdFrom("params", "categoryId"),
  commonMiddleware.checkNonExistenceFrom("params", "categoryId", "카테고리"),
  categoryController.deleteCategory
);

module.exports = categoryRouter;
