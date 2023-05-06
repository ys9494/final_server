const express = require("express");
const { userController } = require("../controller");
const { userMiddleware } = require("../middleware");

const userRouter = express.Router();

// 개인페이지 홈 및 내 정보(정보 수정 中 정보 조회)
userRouter.get(
  "/:id", // 요청으로 params에 넘어온 id 값
  userMiddleware.checkUserIdFrom("params"), // user 테이블 내에 존재하는 유효한 id인지 확인한 후
  userController.getUser, // 해당 id를 가진 user의 모든 정보를 res.json
);

// 개인페이지 > 내 정보(정보 수정 中 정보 수정)
userRouter.put(
  "/:id",
  userMiddleware.checkUserIdFrom("params"),
  userController.updateUser,
);

// 개인페이지 > 내 정보(정보 수정 中 정보 삭제(탈퇴))
userRouter.delete(
  "/:id",
  userMiddleware.checkUserIdFrom("params"),
  userController.deleteUser,
);

// 다른 유저 페이지
userRouter.get(
  "/:id",
  userMiddleware.checkUserIdFrom("params"),
  userController.getUser, // 해당 id를 가진 user의 모든 정보를 res.json
);

module.exports = userRouter;
