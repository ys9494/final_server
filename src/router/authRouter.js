const express = require("express");
const { authMiddleware, userMiddleware } = require("../middleware");
const { authController, userController } = require("../controller");

const authRouter = express.Router();

// 회원가입
authRouter.post(
  "/join",
  userMiddleware.checkJoinFrom,
  userController.createUser
);

// 로그인 (Firebase 사용)
authRouter.post(
  "/login",
  authMiddleware.verifyIdToken,
  authController.loginUser
);

// 로그아웃
authRouter.post("/logout", authController.logoutUser);

// 사용자 정보 삭제 (회원 탈퇴)
authRouter.delete(
  "/:id",
  authMiddleware.verifyIdToken,
  userMiddleware.checkUserIdFrom("params"),
  userController.deleteUser
);

module.exports = authRouter;
