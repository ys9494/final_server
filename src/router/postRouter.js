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
  "/category/:id",
  commonMiddleware.checkIdFrom("params", "id"),
  commonMiddleware.checkNonExistenceFrom("params", "id", "카테고리"),
  postController.getPostsByCategory
);

// 게시글 상세 조회
postRouter.get(
  "/:id",
  commonMiddleware.checkIdFrom("params", "id"),
  commonMiddleware.checkNonExistenceFrom("params", "id", "게시글"),
  postController.getPost
);

// 게시글 수정
postRouter.put(
  "/:id",
  commonMiddleware.checkIdFrom("params", "id"),
  postMiddleware.checkMinPostConditionFrom("body"),
  commonMiddleware.checkNonExistenceFrom("params", "id", "게시글"),
  commonMiddleware.checkNonExistenceFrom("body", "categoryId", "카테고리"),
  postController.putPost
);

// 게시글 삭제
postRouter.delete(
  "/:id",
  commonMiddleware.checkIdFrom("params", "id"),
  commonMiddleware.checkNonExistenceFrom("params", "id", "게시글"),
  postController.deletePost
);

// 전체 게시글 조회
postRouter.get("/", mainController.getPosts);

module.exports = postRouter;
