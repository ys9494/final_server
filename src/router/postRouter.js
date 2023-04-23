const express = require("express");
const { postController } = require("../controller");
const { postMiddleware } = require("../middleware");

const postRouter = express.Router();

postRouter.post(
  "/",
  // postMiddleware.checkCompletePostFrom("body"),
  postController.postPost
);

postRouter.get("/category", postController.getCategory);

postRouter.get(
  "/:id",
  postMiddleware.checkPostIdFrom("params"),
  postController.getPost
);

postRouter.get("/", postController.getPosts);
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
postRouter.delete(
  "/",
  postMiddleware.checkMinPostConditionFrom("body"),
  postController.deletePosts
);

module.exports = postRouter;
