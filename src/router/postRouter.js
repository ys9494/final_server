const express = require("express");
const { postController, mainController } = require("../controller");
const { postMiddleware, categoryMiddleware } = require("../middleware");

const postRouter = express.Router();

postRouter.post(
  "/",
  postMiddleware.checkCompletePostFrom("body"),
  categoryMiddleware.checkNonExistCategoryFrom("body"),
  postController.postPost
);

postRouter.get(
  "/category/:id",
  postMiddleware.checkPostIdFrom("params"),
  categoryMiddleware.checkNonExistCategoryFrom("params"),
  postController.getPostsByCategory
);

postRouter.get(
  "/:id",
  postMiddleware.checkPostIdFrom("params"),
  postMiddleware.checkNonExistPostFrom("params"),
  postController.getPost
);

postRouter.put(
  "/:id",
  postMiddleware.checkPostIdFrom("params"),
  postMiddleware.checkNonExistPostFrom("params"),
  postMiddleware.checkMinPostConditionFrom("body"),
  categoryMiddleware.checkNonExistCategoryFrom("body"),
  postController.putPost
);

postRouter.delete(
  "/:id",
  postMiddleware.checkPostIdFrom("params"),
  postMiddleware.checkNonExistPostFrom("params"),
  postController.deletePost
);

// 예시
postRouter.get("/", mainController.getPosts);

module.exports = postRouter;
