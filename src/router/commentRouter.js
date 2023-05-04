const express = require("express");
const { commentController } = require("../controller");
const { postMiddleware, commentMiddleware } = require("../middleware");

const commentRouter = express.Router();

commentRouter.post(
  "/:postId",
  postMiddleware.checkPostIdFrom("params"),
  postMiddleware.checkNonExistPostFrom("params"),
  commentController.postComment
);

commentRouter.put(
  "/:id",
  commentMiddleware.checkCommentIdFrom("params"),
  commentMiddleware.checkCompleteCommentFrom("body"),
  commentMiddleware.checkNonExistCommentFrom("params"),
  commentController.putComment
);

commentRouter.delete(
  "/:id",
  commentMiddleware.checkCommentIdFrom("params"),
  commentMiddleware.checkNonExistCommentFrom("params"),
  commentController.deleteComment
);

module.exports = commentRouter;
