const express = require("express");
const { postController } = require("../controller");
const { postMiddleware, categoryMiddleware } = require("../middleware");

const postRouter = express.Router();

postRouter.post(
  "/",
  postMiddleware.checkCompletePostFrom("body"),
  categoryMiddleware.checkNonexistCategoryFrom("body"),
  postController.postPost
);

postRouter.get(
  "/category/:id",
  postMiddleware.checkPostIdFrom("params"),
  postController.getPostsByCategory
);

postRouter.get(
  "/:id",
  postMiddleware.checkPostIdFrom("params"),
  postController.getPost
);

postRouter.put(
  "/:id",
  postMiddleware.checkPostIdFrom("params"),
  postMiddleware.checkMinPostConditionFrom("body"),
  postController.putPost
);

postRouter.delete(
  "/:id",
  postMiddleware.checkPostIdFrom("params"),
  postController.deletePost
);

// 예시
// postRouter.get("/", postController.getPosts);

module.exports = postRouter;
