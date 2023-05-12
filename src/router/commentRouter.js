const express = require("express");
const { commentController } = require("../controller");
const {
  postMiddleware,
  commentMiddleware,
  commonMiddleware,
} = require("../middleware");

const commentRouter = express.Router();

// 댓글
commentRouter.post(
  "/:postId",
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  commentController.postComment
);

commentRouter.patch(
  "/:commentId",
  commonMiddleware.checkIdFrom("params", "commentId"),
  commentMiddleware.checkCompleteCommentFrom("body"),
  commonMiddleware.checkNonExistenceFrom("params", "commentId", "댓글"),
  commentController.patchComment
);

commentRouter.delete(
  "/:commentId",
  commonMiddleware.checkIdFrom("params", "commentId"),
  commonMiddleware.checkNonExistenceFrom("params", "commentId", "댓글"),
  commentController.deleteComment
);

module.exports = commentRouter;
