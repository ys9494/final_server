const express = require("express");
const { commentController } = require("../controller");
const {
  postMiddleware,
  commentMiddleware,
  commonMiddleware,
} = require("../middleware");

const commentRouter = express.Router();

commentRouter.post(
  "/:postId",
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  commentController.postComment
);

commentRouter.put(
  "/:id",
  commonMiddleware.checkIdFrom("params", "id"),
  commentMiddleware.checkCompleteCommentFrom("body"),
  commonMiddleware.checkNonExistenceFrom("params", "id", "댓글"),
  commentController.putComment
);

commentRouter.delete(
  "/:id",
  commonMiddleware.checkIdFrom("params", "id"),
  commonMiddleware.checkNonExistenceFrom("params", "id", "댓글"),
  commentController.deleteComment
);

module.exports = commentRouter;
