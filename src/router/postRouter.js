const express = require("express");
const { postController, mainController } = require("../controller");
const {
  postMiddleware,
  categoryMiddleware,
  commonMiddleware,
} = require("../middleware");

const postRouter = express.Router();

// 게시글 작성
postRouter.post(
  "/",
  postMiddleware.checkCompletePostFrom("body"),
  commonMiddleware.checkNonExistenceFrom("body", "categoryId", "카테고리"),
  postController.postPost
);

// 카테고리별 게시글 조회
postRouter.get(
  "/category/:categoryId",
  commonMiddleware.checkIdFrom("params", "categoryId"),
  commonMiddleware.checkNonExistenceFrom("params", "categoryId", "카테고리"),
  postController.getPostsByCategory
);

// 게시글 상세 조회
postRouter.get(
  "/:postId",
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  postController.getPost
);

// 게시글 수정
postRouter.patch(
  "/:postId",
  commonMiddleware.checkIdFrom("params", "postId"),
  postMiddleware.checkMinPostConditionFrom("body"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  commonMiddleware.checkNonExistenceFrom("body", "categoryId", "카테고리"),
  postController.patchPost
);

// 게시글 삭제
postRouter.delete(
  "/:postId",
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  postController.deletePost
);

// 전체 게시글 조회
postRouter.get("/", mainController.getPosts);

// 좋아요
postRouter.patch(
  "/:postId/like",
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  postController.patchLike
);

// 좋아요 취소
postRouter.delete(
  "/:postId/like",
  commonMiddleware.checkIdFrom("params", "postId"),
  commonMiddleware.checkNonExistenceFrom("params", "postId", "게시글"),
  postController.deleteLike
);

module.exports = postRouter;
