const express = require("express");
const { userController } = require("../controller");
const {
  commonMiddleware,
  userMiddleware,
  authMiddleware,
} = require("../middleware");

const userRouter = express.Router();

// 유저 개인페이지 홈 및 내 정보 조회(닉네임으로)
userRouter.get(
  "/",
  authMiddleware.verifyIdToken, // user 테이블 내에 존재하는 닉네임인지 확인한 후
  userController.getMyPageByNickname // 해당 닉네임의 user의 모든 정보를 res.json
);

userRouter.post("/follow");
// 타 유저 페이지 방문시 정보 조회(닉네임으로)
userRouter.get(
  "/",
  // commonMiddleware.checkIdFrom("query", "nickname"), // user 테이블 내에 존재하는 닉네임인지 확인한 후
  // userMiddleware.checkNicknameFrom("query", "nickname"), // req 객체에 담긴 닉네임인지 확인한 후
  userController.getUserByNickname // 해당 닉네임의 user의 모든 정보를 res.json
);

// 개인페이지 > 내 정보(정보 수정 中 정보 수정)
userRouter.patch("/", authMiddleware.verifyIdToken, userController.updateUser);

// 개인페이지 > 내 정보(정보 수정 中 정보 삭제(탈퇴))
userRouter.delete("/", authMiddleware.verifyIdToken, userController.deleteUser);

module.exports = userRouter;
